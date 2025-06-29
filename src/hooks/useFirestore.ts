import { useState, useEffect } from 'react';
import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  where,
  onSnapshot,
  Timestamp 
} from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  description: string;
  duration?: string;
  accountType?: string;
  features?: string[];
  isPopular?: boolean;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  rating: number;
  description: string;
  features?: string[];
  support?: string[];
  technicalSpecs?: string[];
  variants?: ProductVariant[];
  inventory?: {
    stock: number;
    sold: number;
    status: 'active' | 'inactive' | 'draft' | 'archived';
  };
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Order {
  id: string;
  items: any[];
  total: number;
  customerInfo: any;
  date: string;
  status: string;
  userId: string;
  createdAt?: Date;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image: string;
  category: string;
  published?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    const setupListener = () => {
      try {
        unsubscribe = onSnapshot(
          query(collection(db, 'products'), orderBy('createdAt', 'desc')),
          (snapshot) => {
            const productsData = snapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data(),
              createdAt: doc.data().createdAt?.toDate(),
              updatedAt: doc.data().updatedAt?.toDate()
            })) as Product[];
            
            setProducts(productsData);
            setLoading(false);
            setError(null);
          },
          (error) => {
            console.error('Error fetching products:', error);
            setError(error.message);
            setLoading(false);
          }
        );
      } catch (error) {
        console.error('Error setting up products listener:', error);
        setError('Failed to load products');
        setLoading(false);
      }
    };

    const timer = setTimeout(setupListener, 100);

    return () => {
      clearTimeout(timer);
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  const addProduct = async (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const docRef = await addDoc(collection(db, 'products'), {
        ...productData,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      });
      console.log('Product added with ID:', docRef.id);
    } catch (error) {
      console.error('Error adding product:', error);
      throw error;
    }
  };

  const updateProduct = async (id: string, productData: Partial<Product>) => {
    try {
      await updateDoc(doc(db, 'products', id), {
        ...productData,
        updatedAt: Timestamp.now()
      });
      console.log('Product updated:', id);
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'products', id));
      console.log('Product deleted:', id);
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  };

  const updateInventory = async (id: string, inventoryData: Partial<Product['inventory']>) => {
    try {
      const productRef = doc(db, 'products', id);
      const productSnap = await getDoc(productRef);
      
      if (productSnap.exists()) {
        const currentData = productSnap.data();
        await updateDoc(productRef, {
          inventory: { ...currentData.inventory, ...inventoryData },
          updatedAt: Timestamp.now()
        });
      }
    } catch (error) {
      console.error('Error updating inventory:', error);
      throw error;
    }
  };

  return { products, loading, error, addProduct, updateProduct, deleteProduct, updateInventory };
};

export const useOrders = (userId?: string) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    const setupListener = () => {
      try {
        let q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
        
        if (userId) {
          q = query(collection(db, 'orders'), where('userId', '==', userId), orderBy('createdAt', 'desc'));
        }

        unsubscribe = onSnapshot(
          q,
          (snapshot) => {
            const ordersData = snapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data(),
              createdAt: doc.data().createdAt?.toDate()
            })) as Order[];
            
            setOrders(ordersData);
            setLoading(false);
            setError(null);
          },
          (error) => {
            console.error('Error fetching orders:', error);
            setError(error.message);
            setLoading(false);
          }
        );
      } catch (error) {
        console.error('Error setting up orders listener:', error);
        setError('Failed to load orders');
        setLoading(false);
      }
    };

    const timer = setTimeout(setupListener, 100);

    return () => {
      clearTimeout(timer);
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [userId]);

  const addOrder = async (orderData: Omit<Order, 'id' | 'createdAt'>) => {
    try {
      const docRef = await addDoc(collection(db, 'orders'), {
        ...orderData,
        createdAt: Timestamp.now()
      });
      console.log('Order added with ID:', docRef.id);
    } catch (error) {
      console.error('Error adding order:', error);
      throw error;
    }
  };

  return { orders, loading, error, addOrder };
};

export const useBlogPosts = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    const setupListener = () => {
      try {
        unsubscribe = onSnapshot(
          query(collection(db, 'blogPosts'), orderBy('createdAt', 'desc')),
          (snapshot) => {
            const postsData = snapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data(),
              createdAt: doc.data().createdAt?.toDate(),
              updatedAt: doc.data().updatedAt?.toDate()
            })) as BlogPost[];
            
            setPosts(postsData);
            setLoading(false);
            setError(null);
          },
          (error) => {
            console.error('Error fetching blog posts:', error);
            setError(error.message);
            setLoading(false);
          }
        );
      } catch (error) {
        console.error('Error setting up blog posts listener:', error);
        setError('Failed to load blog posts');
        setLoading(false);
      }
    };

    const timer = setTimeout(setupListener, 100);

    return () => {
      clearTimeout(timer);
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  const addBlogPost = async (postData: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const docRef = await addDoc(collection(db, 'blogPosts'), {
        ...postData,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      });
      console.log('Blog post added with ID:', docRef.id);
    } catch (error) {
      console.error('Error adding blog post:', error);
      throw error;
    }
  };

  const updateBlogPost = async (id: string, postData: Partial<BlogPost>) => {
    try {
      await updateDoc(doc(db, 'blogPosts', id), {
        ...postData,
        updatedAt: Timestamp.now()
      });
      console.log('Blog post updated:', id);
    } catch (error) {
      console.error('Error updating blog post:', error);
      throw error;
    }
  };

  const deleteBlogPost = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'blogPosts', id));
      console.log('Blog post deleted:', id);
    } catch (error) {
      console.error('Error deleting blog post:', error);
      throw error;
    }
  };

  return { posts, loading, error, addBlogPost, updateBlogPost, deleteBlogPost };
};

export const useProduct = (id: string) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        const docRef = doc(db, 'products', id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setProduct({
            id: docSnap.id,
            ...docSnap.data(),
            createdAt: docSnap.data().createdAt?.toDate(),
            updatedAt: docSnap.data().updatedAt?.toDate()
          } as Product);
        } else {
          setProduct(null);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        setError(error instanceof Error ? error.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return { product, loading, error };
};
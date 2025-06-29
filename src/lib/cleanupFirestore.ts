import { collection, getDocs, deleteDoc, doc, writeBatch } from 'firebase/firestore';
import { db } from './firebase';

// Emergency function to delete ALL products from Firestore
export const deleteAllProducts = async (): Promise<{ success: boolean; deletedCount: number; error?: string }> => {
  try {
    console.log('🚨 Starting emergency cleanup of all products...');
    
    const productsRef = collection(db, 'products');
    const snapshot = await getDocs(productsRef);
    
    const totalProducts = snapshot.size;
    console.log(`Found ${totalProducts} products to delete`);
    
    if (totalProducts === 0) {
      return { success: true, deletedCount: 0 };
    }

    // Use batch operations for efficient deletion (max 500 per batch)
    const batches = [];
    let currentBatch = writeBatch(db);
    let operationCount = 0;
    let deletedCount = 0;

    snapshot.docs.forEach((docSnapshot) => {
      currentBatch.delete(doc(db, 'products', docSnapshot.id));
      operationCount++;
      deletedCount++;

      // Firestore batch limit is 500 operations
      if (operationCount === 500) {
        batches.push(currentBatch);
        currentBatch = writeBatch(db);
        operationCount = 0;
      }
    });

    // Add the last batch if it has operations
    if (operationCount > 0) {
      batches.push(currentBatch);
    }

    // Execute all batches
    console.log(`Executing ${batches.length} batch operations...`);
    for (let i = 0; i < batches.length; i++) {
      await batches[i].commit();
      console.log(`Batch ${i + 1}/${batches.length} completed`);
    }

    console.log(`✅ Successfully deleted ${deletedCount} products from Firestore`);
    return { success: true, deletedCount };

  } catch (error) {
    console.error('❌ Error deleting products:', error);
    return { 
      success: false, 
      deletedCount: 0, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
};

// Function to get product count without loading all data
export const getProductCount = async (): Promise<number> => {
  try {
    const snapshot = await getDocs(collection(db, 'products'));
    return snapshot.size;
  } catch (error) {
    console.error('Error getting product count:', error);
    return 0;
  }
};

// Function to verify cleanup completion
export const verifyCleanup = async (): Promise<boolean> => {
  try {
    const count = await getProductCount();
    return count === 0;
  } catch (error) {
    console.error('Error verifying cleanup:', error);
    return false;
  }
};
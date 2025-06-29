import { doc, setDoc, collection, addDoc, getDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from './firebase';

let isInitializing = false;
let hasInitialized = false;

export const initializeAdminAndData = async () => {
  // Prevent multiple simultaneous initializations
  if (isInitializing || hasInitialized) {
    console.log('Initialization already in progress or completed');
    return;
  }

  // Check localStorage flag to prevent re-initialization
  const initFlag = localStorage.getItem('morgan-digital-initialized');
  if (initFlag === 'true') {
    console.log('App already initialized (localStorage flag found)');
    hasInitialized = true;
    return;
  }

  isInitializing = true;

  try {
    console.log('Starting one-time initialization...');

    // Check if basic settings already exist
    const settingsCheck = await getDoc(doc(db, 'settings', 'website'));
    if (settingsCheck.exists()) {
      console.log('Settings already exist, skipping initialization');
      localStorage.setItem('morgan-digital-initialized', 'true');
      hasInitialized = true;
      isInitializing = false;
      return;
    }

    // Create admin user only if it doesn't exist
    try {
      const adminCredential = await createUserWithEmailAndPassword(auth, 'admin@gmail.com', 'tubankidul36');
      const adminUser = adminCredential.user;

      await updateProfile(adminUser, {
        displayName: 'Administrator'
      });

      // Create admin document in Firestore
      await setDoc(doc(db, 'users', adminUser.uid), {
        name: 'Administrator',
        email: 'admin@gmail.com',
        role: 'admin',
        createdAt: new Date()
      });

      console.log('Admin user created successfully');
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        console.log('Admin email already exists - continuing with initialization');
      } else {
        console.error('Error creating admin:', error);
        throw error; // Re-throw if it's not the expected error
      }
    }

    // Initialize website settings with complete configuration
    await setDoc(doc(db, 'settings', 'website'), {
      siteName: 'Morgan Digital',
      siteDescription: 'Premium Digital Products for Your Business',
      logo: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=100',
      favicon: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=32',
      primaryColor: '#3b82f6',
      secondaryColor: '#8b5cf6',
      contactEmail: 'info@morgandigital.com',
      contactPhone: '+62 812-3456-7890',
      whatsappNumber: '6281234567890',
      address: 'Jl. Sudirman No. 123, Jakarta Pusat, DKI Jakarta, Indonesia 10220',
      socialMedia: {
        facebook: 'https://facebook.com/morgandigital',
        twitter: 'https://twitter.com/morgandigital',
        instagram: 'https://instagram.com/morgandigital',
        linkedin: 'https://linkedin.com/company/morgandigital',
        youtube: 'https://youtube.com/channel/morgandigital',
        tiktok: 'https://tiktok.com/@morgandigital'
      },
      seo: {
        metaTitle: 'Morgan Digital - Premium Digital Products',
        metaDescription: 'Dapatkan aplikasi premium, desain website modern, dan source code berkualitas tinggi untuk mengembangkan bisnis digital Anda',
        keywords: 'digital products, aplikasi premium, website design, source code, morgan digital'
      },
      welcomePopup: {
        enabled: true,
        title: '🎉 Selamat Datang di Morgan Digital!',
        message: 'Dapatkan diskon hingga 50% untuk semua produk digital premium kami. Jangan lewatkan penawaran terbatas ini!',
        buttonText: 'Lihat Penawaran',
        buttonLink: '/products',
        showDelay: 3,
        backgroundColor: '#ffffff',
        textColor: '#1f2937'
      },
      updatedAt: new Date()
    });

    // Initialize inventory settings
    await setDoc(doc(db, 'settings', 'inventory'), {
      lowStockThreshold: 10,
      autoRestock: false,
      trackSales: true,
      enableNotifications: true,
      categories: [
        'Aplikasi Premium',
        'Desain Website', 
        'Source Code',
        'Template Mobile',
        'Plugin & Extension'
      ],
      statuses: [
        { value: 'active', label: 'Aktif', color: 'green' },
        { value: 'inactive', label: 'Tidak Aktif', color: 'red' },
        { value: 'draft', label: 'Draft', color: 'yellow' },
        { value: 'archived', label: 'Arsip', color: 'gray' }
      ],
      updatedAt: new Date()
    });

    // Set initialization flag
    localStorage.setItem('morgan-digital-initialized', 'true');
    hasInitialized = true;

    console.log('✅ One-time initialization completed successfully (clean start - no dummy data)');
  } catch (error) {
    console.error('❌ Error during initialization:', error);
    // Don't set the flag if there was an error
  } finally {
    isInitializing = false;
  }
};

// Function to reset initialization (for development/testing only)
export const resetInitialization = () => {
  localStorage.removeItem('morgan-digital-initialized');
  hasInitialized = false;
  isInitializing = false;
  console.log('Initialization reset - will run again on next app start');
};
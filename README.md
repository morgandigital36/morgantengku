# Morgan Digital - Premium Digital Products Store

A modern, full-featured e-commerce platform for digital products built with React, TypeScript, Firebase, and Tailwind CSS.

## 🚀 Features

### 🛍️ **E-commerce Core**
- **Product Management**: Complete CRUD operations with variants, inventory tracking
- **Shopping Cart**: Full cart functionality with persistent storage
- **Checkout System**: Multi-payment method support (DANA, OVO, GoPay, ShopeePay, Bank Transfer, QRIS)
- **Order Management**: Real-time order tracking and status updates
- **WhatsApp Integration**: Direct checkout to WhatsApp for payment confirmation

### 👤 **User Management**
- **Authentication**: Secure login/register with Firebase Auth
- **User Dashboard**: Order history, downloads, favorites, profile settings
- **Admin Dashboard**: Comprehensive admin panel for managing everything
- **Role-based Access**: Admin and customer role separation

### 📱 **Modern UI/UX**
- **Mobile-first Design**: Responsive design that works on all devices
- **Dark Mode**: Full dark/light theme support with system preference detection
- **App-like Interface**: Mobile app-style navigation and interactions
- **Smooth Animations**: Micro-interactions and transitions throughout

### 📝 **Content Management**
- **Blog System**: Built-in blog with comment system and categories
- **Dynamic Settings**: Configurable website settings, payment methods, and more
- **Welcome Popup**: Customizable promotional popups
- **SEO Optimized**: Meta tags, structured data, and performance optimized

### 🎨 **Customization**
- **Theme System**: Easy color and branding customization
- **Payment Methods**: Flexible payment method configuration with images
- **Product Variants**: Support for different product versions (duration, account types)
- **Category Management**: Dynamic product categories

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Firebase (Auth, Firestore)
- **Routing**: React Router DOM v6
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Deployment**: Vercel
- **Styling**: Tailwind CSS with custom components

## 📦 Installation

1. **Clone the repository:**
```bash
git clone https://github.com/yourusername/morgan-digital.git
cd morgan-digital
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up Firebase:**
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com)
   - Enable Authentication (Email/Password)
   - Enable Firestore Database
   - Copy your Firebase config to `src/lib/firebase.ts`

4. **Start the development server:**
```bash
npm run dev
```

## 🚀 Deployment

### Deploy to Vercel

1. **Push to GitHub:**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Deploy to Vercel:**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository
   - Deploy automatically

Or use Vercel CLI:
```bash
npm install -g vercel
vercel
```

### Build for Production

```bash
npm run build
```

## 🔧 Configuration

### Admin Account
- **Email**: `admin@gmail.com`
- **Password**: `tubankidul36`

### Firebase Setup
Update `src/lib/firebase.ts` with your Firebase configuration:

```typescript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id"
};
```

### Environment Variables (Optional)
For production, you can use environment variables:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## 📱 Features Overview

### For Customers
- **Browse Products**: Filter by category, search, and view detailed product pages
- **Shopping Cart**: Add products, manage quantities, and proceed to checkout
- **Multiple Payment Options**: Choose from various payment methods
- **User Account**: Track orders, manage profile, and view purchase history
- **Blog & Articles**: Read latest articles and leave comments
- **Contact Support**: Multiple ways to get in touch

### For Admins
- **Dashboard Overview**: Sales statistics, recent orders, and key metrics
- **Product Management**: Add, edit, delete products with variants and inventory
- **Order Management**: View and manage customer orders
- **Payment Settings**: Configure payment methods with custom details
- **Website Settings**: Customize site information, contact details, and more
- **Blog Management**: Create and manage blog posts
- **User Management**: View customer accounts and activity

## 🎨 Customization

### Themes
The app supports dark/light themes. Customize colors in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        50: '#eff6ff',
        500: '#3b82f6',
        600: '#2563eb',
        // ... more shades
      }
    }
  }
}
```

### Payment Methods
Configure payment methods in the admin dashboard:
- Enable/disable specific methods
- Set account details and instructions
- Add custom images/logos
- Configure payment instructions

### Product Variants
Support for different product versions:
- **Duration**: 1 month, 6 months, 1 year, lifetime
- **Account Types**: Personal, Business, Enterprise
- **Custom Features**: Different feature sets per variant
- **Pricing**: Different prices per variant

## 📊 Data Structure

### Products
```typescript
interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  rating: number;
  description: string;
  features?: string[];
  variants?: ProductVariant[];
  inventory?: {
    stock: number;
    sold: number;
    status: 'active' | 'inactive' | 'draft' | 'archived';
  };
}
```

### Orders
```typescript
interface Order {
  id: string;
  items: CartItem[];
  total: number;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    paymentMethod: string;
  };
  status: string;
  userId: string;
  date: string;
}
```

### Payment Methods
```typescript
interface PaymentMethod {
  enabled: boolean;
  number?: string;
  name?: string;
  instructions: string;
  image?: string;
  // Bank-specific fields
  bankName?: string;
  accountNumber?: string;
  accountName?: string;
  // QRIS-specific fields
  qrImage?: string;
}
```

## 🔒 Security

- **Firebase Authentication**: Secure user authentication and authorization
- **Firestore Security Rules**: Database-level security rules
- **Protected Routes**: Admin-only routes and user-specific data
- **Input Validation**: Client and server-side validation
- **XSS Protection**: Sanitized user inputs and secure rendering

## 🚀 Performance

- **Code Splitting**: Automatic code splitting with React.lazy
- **Image Optimization**: Optimized images with proper loading
- **Caching**: Browser caching for static assets
- **Bundle Optimization**: Tree shaking and minification
- **Lazy Loading**: Components and routes loaded on demand

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, email info@morgandigital.com or create an issue on GitHub.

## 🙏 Acknowledgments

- **React Team** for the amazing framework
- **Firebase** for backend services
- **Tailwind CSS** for the utility-first CSS framework
- **Lucide** for beautiful icons
- **Vercel** for seamless deployment
- **TypeScript** for type safety

---

**Made with ❤️ by Morgan Digital Team**

## 📈 Roadmap

- [ ] **Multi-language Support**: Internationalization (i18n)
- [ ] **Advanced Analytics**: Detailed sales and user analytics
- [ ] **Email Marketing**: Newsletter and promotional emails
- [ ] **Advanced Search**: Elasticsearch integration
- [ ] **Mobile App**: React Native mobile application
- [ ] **API Integration**: RESTful API for third-party integrations
- [ ] **Advanced Payment**: Stripe/PayPal integration
- [ ] **Inventory Alerts**: Low stock notifications
- [ ] **Customer Reviews**: Product review and rating system
- [ ] **Wishlist**: Customer wishlist functionality

## 🔧 Development

### Project Structure
```
src/
├── components/          # Reusable UI components
├── contexts/           # React contexts (Auth, Cart, Theme)
├── hooks/              # Custom React hooks
├── lib/                # Utilities and configurations
├── pages/              # Page components
├── types/              # TypeScript type definitions
└── styles/             # Global styles and Tailwind config
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Style
- **TypeScript**: Strict mode enabled
- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting (recommended)
- **Conventional Commits**: Commit message format

Ready for production deployment! 🚀
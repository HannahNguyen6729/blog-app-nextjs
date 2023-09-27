import './globals.css';
import { Inter } from 'next/font/google';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import AuthProvider from '../providers/AuthProvider';
import Theme from '../context/Theme';
import { ThemeProvider } from '../context/ThemeContextProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Blog App',
  description: 'This is my first blog',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <AuthProvider>
          <ThemeProvider>
            <Theme>
              <div className="container">
                <div className="wrapper">
                  <Navbar />
                  {children}
                  <Footer />
                </div>
              </div>
            </Theme>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

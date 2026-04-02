import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { Leaf, Menu, X } from 'lucide-react';
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${scrolled ? 'bg-background/95 backdrop-blur border-b shadow-sm' : 'bg-transparent'}`}>
      
      <div className="container flex h-16 items-center justify-between">
        <Link
          to="/"
          className={`flex items-center gap-2 hover:opacity-80 transition-opacity ${scrolled ? 'text-primary' : 'text-white'}`}>
          
          <Leaf className="h-6 w-6" />
          <span className="text-xl font-bold tracking-tight">AgriManage</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {['Tính năng', 'Cách hoạt động', 'Đánh giá'].map((label, i) =>
          <a
            key={i}
            href={`#${['features', 'how-it-works', 'testimonials'][i]}`}
            className={`transition-colors ${scrolled ? 'text-foreground/80 hover:text-primary' : 'text-white/80 hover:text-white'}`}>
            
              {label}
            </a>
          )}
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2">
            <Button
              asChild
              variant="ghost"
              className={
              scrolled ? '' : 'text-white hover:bg-white/10 hover:text-white'
              }>
              
              <Link to="/login">Đăng nhập</Link>
            </Button>
            <Button
              asChild
              className={
              scrolled ?
              '' :
              'bg-emerald-600 hover:bg-emerald-700 text-white border-0'
              }>
              
              <Link to="/register">Đăng ký miễn phí</Link>
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className={`md:hidden ${scrolled ? '' : 'text-white hover:bg-white/10'}`}
            onClick={() => setMobileOpen(!mobileOpen)}>
            
            {mobileOpen ?
            <X className="h-5 w-5" /> :

            <Menu className="h-5 w-5" />
            }
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen &&
      <div className="md:hidden bg-background border-b shadow-lg">
          <div className="container py-4 flex flex-col gap-3">
            <a
            href="#features"
            className="py-2 text-foreground/80 hover:text-primary"
            onClick={() => setMobileOpen(false)}>
            
              Tính năng
            </a>
            <a
            href="#how-it-works"
            className="py-2 text-foreground/80 hover:text-primary"
            onClick={() => setMobileOpen(false)}>
            
              Cách hoạt động
            </a>
            <a
            href="#testimonials"
            className="py-2 text-foreground/80 hover:text-primary"
            onClick={() => setMobileOpen(false)}>
            
              Đánh giá
            </a>
            <div className="flex flex-col gap-2 pt-2 border-t">
              <Button asChild variant="outline" className="w-full">
                <Link to="/login">Đăng nhập</Link>
              </Button>
              <Button asChild className="w-full">
                <Link to="/register">Đăng ký miễn phí</Link>
              </Button>
            </div>
          </div>
        </div>
      }
    </header>);

}
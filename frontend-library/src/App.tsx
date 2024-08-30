
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { HomePage } from './layouts/HomePage/HomePage'
import { Footer } from './layouts/NavbarAndFooter/Footer'
import { Navbar } from './layouts/NavbarAndFooter/Navbar'
import { SearchBooksPage } from './layouts/SearchBooksPage/SearchBooksPage'
import { BookCheckoutPage } from './layouts/BookCheckoutPage/BookCheckoutPage'
import { LoginPage } from './layouts/Login/LoginPage'
import { AuthProvider } from './auth/AuthContext'
import {ReviewListPage} from "./layouts/BookCheckoutPage/ReviewListPage/ReviewListPage.tsx";
import {ShelfPage} from "./layouts/ShelfPage/ShelfPage.tsx";
import {SecureRoute} from "./auth/SecureRoute.tsx";
import {MessagePage} from "./layouts/MessagesPage/MessagePage.tsx";
import {ManageLibraryPage} from "./layouts/ManageLibraryPage/ManageLibraryPage.tsx";
import {PaymentPage} from "./layouts/PaymentPage/PaymentPage.tsx";

export const App = () => {

  return (
    <div className='d-flex flex-column min-vh-100'>
      <AuthProvider>
        <Navbar />
        <div className='flex-grow-1'>
          <Routes>
            <Route path='/' element={<Navigate to='/home' />} />
            <Route path='/home' element={<HomePage />} />
            <Route path='/search' element={<SearchBooksPage />} />
            <Route path='/reviewList/:bookId' element={<ReviewListPage />} />
            <Route path='/checkout/:bookId' element={<BookCheckoutPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/shelf' element={<SecureRoute comp={ShelfPage} />} />
            <Route path='/messages' element={<SecureRoute comp={MessagePage}/>} />
            <Route path='/admin' element={<SecureRoute comp={ManageLibraryPage}/>} />
            <Route path='/fees' element={<SecureRoute comp={PaymentPage}/>} />
          </Routes>
        </div>
        <Footer />
      </AuthProvider>
    </div>
  )
}
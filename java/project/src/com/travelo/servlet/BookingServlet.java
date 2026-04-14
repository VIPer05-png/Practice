package com.travelo.servlet;

import com.travelo.dao.BookingDao;
import com.travelo.model.User;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@WebServlet("/book")
public class BookingServlet extends HttpServlet {
    
    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
            
        HttpSession session = request.getSession(false);
        if (session == null || session.getAttribute("user") == null) {
            response.sendRedirect("login.jsp?error=Please login to book");
            return;
        }
        
        User user = (User) session.getAttribute("user");
        String type = request.getParameter("type");
        int referenceId = Integer.parseInt(request.getParameter("referenceId"));
        double price = Double.parseDouble(request.getParameter("price"));
        
        BookingDao bookingDao = new BookingDao();
        if (bookingDao.createBooking(user.getId(), type, referenceId, price)) {
            response.sendRedirect("dashboard.jsp?msg=Booking Confirmed Successfully!");
        } else {
            response.sendRedirect("dashboard.jsp?error=Booking Failed");
        }
    }
}

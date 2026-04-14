package com.travelo.servlet;

import com.travelo.dao.UserDao;
import com.travelo.model.User;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@WebServlet("/auth")
public class AuthServlet extends HttpServlet {
    
    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
            
        String action = request.getParameter("action");
        UserDao userDao = new UserDao();
        
        if ("login".equals(action)) {
            String email = request.getParameter("email");
            String password = request.getParameter("password");
            
            User user = userDao.loginUser(email, password);
            if (user != null) {
                HttpSession session = request.getSession();
                session.setAttribute("user", user);
                if ("ADMIN".equals(user.getRole())) {
                    response.sendRedirect("admin_dashboard.jsp");
                } else {
                    response.sendRedirect("dashboard.jsp");
                }
            } else {
                response.sendRedirect("login.jsp?error=Invalid credentials");
            }
        } else if ("register".equals(action)) {
            String name = request.getParameter("name");
            String email = request.getParameter("email");
            String password = request.getParameter("password");
            
            User newUser = new User(0, name, email, password, "USER");
            if (userDao.registerUser(newUser)) {
                response.sendRedirect("login.jsp?msg=Registration successful. Please login.");
            } else {
                response.sendRedirect("register.jsp?error=Registration failed");
            }
        }
    }
    
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        String action = request.getParameter("action");
        if ("logout".equals(action)) {
            HttpSession session = request.getSession(false);
            if (session != null) {
                session.invalidate();
            }
            response.sendRedirect("index.jsp");
        }
    }
}

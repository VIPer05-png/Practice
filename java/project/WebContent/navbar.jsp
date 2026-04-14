<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.travelo.model.User" %>
<nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
  <div class="container">
    <a class="navbar-brand fw-bold" href="index.jsp">🌎 TRAVELO</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item">
          <a class="nav-link" href="index.jsp">Home</a>
        </li>
        <%
            User user = (User) session.getAttribute("user");
            if (user != null) {
                if ("ADMIN".equals(user.getRole())) {
        %>
                    <li class="nav-item"><a class="nav-link" href="admin_dashboard.jsp">Admin Dashboard</a></li>
        <%      } else { %>
                    <li class="nav-item"><a class="nav-link" href="dashboard.jsp">Dashboard</a></li>
        <%      } %>
                <li class="nav-item"><a class="nav-link text-warning fw-bold" href="auth?action=logout">Logout (<%= user.getName() %>)</a></li>
        <%  } else { %>
                <!-- User is not logged in -->
                <li class="nav-item">
                  <a class="nav-link" href="login.jsp">Login</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link btn btn-light text-primary ms-2 px-3 fw-bold" href="register.jsp">Register</a>
                </li>
        <%  } %>
      </ul>
    </div>
  </div>
</nav>

<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Login - TRAVELO</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">

    <%@ include file="navbar.jsp" %>

    <div class="container d-flex justify-content-center align-items-center" style="min-height: 80vh;">
        <div class="card shadow border-0" style="width: 400px; border-radius: 15px;">
            <div class="card-body p-5">
                <h3 class="text-center fw-bold text-primary mb-4">Welcome Back</h3>
                
                <!-- Error or Success Messages -->
                <% if(request.getParameter("error") != null) { %>
                    <div class="alert alert-danger"><%= request.getParameter("error") %></div>
                <% } %>
                <% if(request.getParameter("msg") != null) { %>
                    <div class="alert alert-success"><%= request.getParameter("msg") %></div>
                <% } %>
                
                <form action="auth" method="post">
                    <input type="hidden" name="action" value="login">
                    
                    <div class="mb-3">
                        <label class="form-label text-muted">Email address</label>
                        <input type="email" name="email" class="form-control" placeholder="admin@travelo.com" required>
                    </div>
                    <div class="mb-4">
                        <label class="form-label text-muted">Password</label>
                        <input type="password" name="password" class="form-control" placeholder="admin123" required>
                    </div>
                    
                    <button type="submit" class="btn btn-primary w-100 py-2 fw-bold">Login</button>
                    
                    <div class="text-center mt-3">
                        <small class="text-muted">Don't have an account? <a href="register.jsp" class="text-decoration-none fw-bold">Register</a></small>
                    </div>
                </form>
            </div>
        </div>
    </div>

</body>
</html>

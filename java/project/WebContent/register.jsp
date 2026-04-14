<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Register - TRAVELO</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">

    <%@ include file="navbar.jsp" %>

    <div class="container d-flex justify-content-center align-items-center" style="min-height: 80vh;">
        <div class="card shadow border-0" style="width: 450px; border-radius: 15px;">
            <div class="card-body p-5">
                <h3 class="text-center fw-bold text-primary mb-4">Create Account</h3>
                
                <% if(request.getParameter("error") != null) { %>
                    <div class="alert alert-danger"><%= request.getParameter("error") %></div>
                <% } %>
                
                <form action="auth" method="post">
                    <input type="hidden" name="action" value="register">
                    
                    <div class="mb-3">
                        <label class="form-label text-muted">Full Name</label>
                        <input type="text" name="name" class="form-control" placeholder="John Doe" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label text-muted">Email address</label>
                        <input type="email" name="email" class="form-control" placeholder="john@example.com" required>
                    </div>
                    <div class="mb-4">
                        <label class="form-label text-muted">Password</label>
                        <input type="password" name="password" class="form-control" placeholder="Secret Password" required>
                    </div>
                    
                    <button type="submit" class="btn btn-primary w-100 py-2 fw-bold">Register Now</button>
                    
                    <div class="text-center mt-3">
                        <small class="text-muted">Already have an account? <a href="login.jsp" class="text-decoration-none fw-bold">Login</a></small>
                    </div>
                </form>
            </div>
        </div>
    </div>

</body>
</html>

<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Hello TRAVELO - Travel & Hotel Management</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
        <style>
            .hero-section {
                background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=1920') no-repeat center center;
                background-size: cover;
                height: 80vh;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
            }
        </style>
    </head>

    <body>

        <%@ include file="navbar.jsp" %>

            <div class="hero-section text-center">
                <div class="container">
                    <h1 class="display-3 fw-bold mb-4">Discover Your Next Adventure</h1>
                    <p class="lead mb-5 fs-4">Book the best travel packages and luxury hotels all in one place.</p>
                    <a href="register.jsp" class="btn btn-primary btn-lg px-5 py-3 fs-5 me-3 rounded-pill shadow">Start
                        Booking</a>
                    <a href="login.jsp"
                        class="btn btn-outline-light btn-lg px-5 py-3 fs-5 rounded-pill shadow">Login</a>
                </div>
            </div>

            <div class="container my-5">
                <h2 class="text-center mb-5 fw-bold text-secondary">Why Choose TRAVELO?</h2>
                <div class="row text-center">
                    <div class="col-md-4 mb-4">
                        <div class="card h-100 border-0 shadow-sm p-4">
                            <h3 class="fw-bold text-primary">🏕️ All-In-One</h3>
                            <p class="text-muted">Travel and hotel booking combined into one seamless experience.</p>
                        </div>
                    </div>
                    <div class="col-md-4 mb-4">
                        <div class="card h-100 border-0 shadow-sm p-4">
                            <h3 class="fw-bold text-primary">⚡ Fast Checkouts</h3>
                            <p class="text-muted">Save your time with our highly optimized booking system.</p>
                        </div>
                    </div>
                    <div class="col-md-4 mb-4">
                        <div class="card h-100 border-0 shadow-sm p-4">
                            <h3 class="fw-bold text-primary">🛡️ Reliable</h3>
                            <p class="text-muted">Database powered application built with the robustness of Java.</p>
                        </div>
                    </div>
                </div>
            </div>

            <footer class="bg-dark text-white text-center py-3">
                <p class="mb-0">© 2026 TRAVELO - MCA Project by Your Name</p>
            </footer>

            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    </body>

    </html>
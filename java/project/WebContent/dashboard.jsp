<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.travelo.dao.ItemDao" %>
<%@ page import="com.travelo.model.Package" %>
<%@ page import="com.travelo.model.Hotel" %>
<%@ page import="java.util.List" %>
<%
    if(session.getAttribute("user") == null) {
        response.sendRedirect("login.jsp?error=Access Denied! Please login.");
        return;
    }
%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>User Dashboard - TRAVELO</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">

    <%@ include file="navbar.jsp" %>

    <div class="container mt-5">
        <h2 class="mb-4">Welcome, ${sessionScope.user.name} 👋</h2>

        <% if(request.getParameter("error") != null) { %>
            <div class="alert alert-danger"><%= request.getParameter("error") %></div>
        <% } %>
        <% if(request.getParameter("msg") != null) { %>
            <div class="alert alert-success alert-dismissible"><%= request.getParameter("msg") %></div>
        <% } %>
        
        <!-- Travel Packages Section -->
        <h3 class="fw-bold text-primary mt-5 mb-3">Popular Travel Packages</h3>
        <div class="row">
            <%
                ItemDao itemDao = new ItemDao();
                List<Package> packages = itemDao.getAllPackages();
                for(Package pkg : packages) {
            %>
            <div class="col-md-4 mb-4">
                <div class="card h-100 shadow-sm border-0">
                    <div class="card-body">
                        <h5 class="card-title fw-bold text-dark">🏕️ <%= pkg.getDestination() %></h5>
                        <p class="text-muted small"><%= pkg.getDuration() %></p>
                        <p class="card-text"><%= pkg.getDescription() %></p>
                        <h4 class="text-primary mb-3">₹<%= pkg.getPrice() %></h4>
                        
                        <form action="book" method="post">
                            <input type="hidden" name="type" value="PACKAGE">
                            <input type="hidden" name="referenceId" value="<%= pkg.getId() %>">
                            <input type="hidden" name="price" value="<%= pkg.getPrice() %>">
                            <button type="submit" class="btn btn-outline-primary w-100">Book Package</button>
                        </form>
                    </div>
                </div>
            </div>
            <% } %>
        </div>

        <!-- Hotels Section -->
        <h3 class="fw-bold text-success mt-5 mb-3">Luxury Hotels</h3>
        <div class="row mb-5">
            <%
                List<Hotel> hotels = itemDao.getAllHotels();
                for(Hotel hotel : hotels) {
            %>
            <div class="col-md-4 mb-4">
                <div class="card h-100 shadow-sm border-0">
                    <img src="<%= hotel.getImageUrl() %>" class="card-img-top" alt="<%= hotel.getName() %>" style="height:200px; object-fit:cover;">
                    <div class="card-body">
                        <h5 class="card-title fw-bold text-dark">🏨 <%= hotel.getName() %></h5>
                        <p class="text-muted"><%= hotel.getLocation() %></p>
                        <h4 class="text-success mb-3">₹<%= hotel.getPricePerNight() %> / night</h4>
                        
                        <form action="book" method="post">
                            <input type="hidden" name="type" value="HOTEL">
                            <input type="hidden" name="referenceId" value="<%= hotel.getId() %>">
                            <input type="hidden" name="price" value="<%= hotel.getPricePerNight() %>">
                            <button type="submit" class="btn btn-outline-success w-100">Book Hotel</button>
                        </form>
                    </div>
                </div>
            </div>
            <% } %>
        </div>

    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>

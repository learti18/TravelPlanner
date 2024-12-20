import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Plane } from 'lucide-react';

export default function Footer() {
    const location = useLocation();
    const isHomePage = location.pathname === "/";
    const isDashboardPage = location.pathname.includes("/dashboard");
    const isQuestionnaire = location.pathname.includes("/questionnaire"); 

    if (isHomePage) return null;
    if (isDashboardPage) return null;
    if(isQuestionnaire) return null;

    return (
        <footer className="bg-gray-50 text-gray-600 mt-auto ">
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
                <div className="flex items-center gap-2 mb-4">
                <Plane className="text-gray-800" />
                <h3 className="text-lg font-bold text-gray-800">TripPlanner</h3>
                </div>
                <p className="text-gray-500">
                Discover, plan, and experience your perfect journey with our comprehensive travel planning platform.
                </p>
            </div>
            <div>
                <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Links</h3>
                <ul className="space-y-2">
                <li>
                    <Link to="/list-destinations" className="text-gray-500 hover:text-gray-800 transition-colors">
                    Destinations
                    </Link>
                </li>
                <li>
                    <Link to="/dashboard" className="text-gray-500 hover:text-gray-800 transition-colors">
                    Dashboard
                    </Link>
                </li>
                </ul>
            </div>
            <div>
                <h3 className="text-lg font-bold text-gray-800 mb-4">Contact</h3>
                <div className="space-y-2 text-gray-500">
                <p>Email: contact@tripplanner.com</p>
                <p>Follow us on social media</p>
                </div>
            </div>
            </div>
            
            <div className="mt-8 pt-8 border-t text-center">
            <p className="text-gray-400">
                &copy; {new Date().getFullYear()} TripPlanner. All rights reserved.
            </p>
            </div>
        </div>
        </footer>
    );
}
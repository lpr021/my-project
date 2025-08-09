import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';
import './styles/main.css'; // or './styles/main.scss'


// Mock data for the application
const PROPERTY_DATA = {
    locations: [
    {
      name: "KBP",
      image: "https://thealakananda.com/wp-content/uploads/2024/04/Villa-792-South-West-View-1536x864.jpg", // Replace with actual image URL
      highlight: "Premium Plots by KBP – Strategically located and meticulously planned, KBP’s premium plots offer spacious layouts, prime connectivity, and high investment potential for both residential and commercial use."
    },
    {
      name: "SRI CITY", 
      image: "https://www.constructionplacements.com/wp-content/uploads/2018/06/Delhi-Mumbai-Industrial-Corridor-Global-Megaproject-.jpg",
      highlight: "Sri City – Nestled near the thriving industrial corridor, Sri City offers exceptional growth potential, seamless connectivity, and a prime location for both investors and businesses."
    },
    {
      name: "SUN SREE",
      image: "https://vbvrprojects.com/wp-content/uploads/2023/05/buildings-with-outdoor-facilities-1.jpg",
      highlight: "Sun Sree – A secure gated community featuring modern amenities, landscaped surroundings, and a vibrant neighborhood designed for comfortable, premium living."
    }
  ],
  plots: [
    {
      id: "KBP-01",
      location: "KBP",
      title: "KBP Premium Plot",
      totalArea: "150 Acres",
      plotSize: "1200 sqft",
      pricePerSqft: 2000,
      brochureUrl: "/brochures/kbp-premium.pdf",
      videoUrl: "https://www.youtube.com/embed/sample1",
      phone: "+919876543210",
      whatsapp: "+919876543210",
      coords: { lat: 17.0500, lng: 80.6580 },
      types: ["4BHK", "Villa"]
    },
    {
      id: "KBP-02",
      location: "KBP",
      title: "KBP Green Field",
      totalArea: "60 Acres",
      plotSize: "1000 sqft",
      pricePerSqft: 1800,
      brochureUrl: "/brochures/kbp-green.pdf",
      videoUrl: "https://www.youtube.com/embed/sample2",
      phone: "+919876543211",
      whatsapp: "+919876543211",
      coords: { lat: 17.0520, lng: 80.6600 },
      types: ["3BHK"]
    },
    {
      id: "SRC-01",
      location: "SRI CITY",
      title: "Sri City Estate",
      totalArea: "200 Acres",
      plotSize: "1500 sqft",
      pricePerSqft: 2200,
      brochureUrl: "/brochures/sri-city.pdf",
      videoUrl: "https://www.youtube.com/embed/sample3",
      phone: "+919876543212",
      whatsapp: "+919876543212",
      coords: { lat: 13.6288, lng: 79.9845 },
      types: ["2BHK", "3BHK"]
    },
    {
      id: "SNS-01",
      location: "SUN SREE",
      title: "Sun Sree Valley",
      totalArea: "100 Acres",
      plotSize: "1000 sqft",
      pricePerSqft: 1800,
      brochureUrl: "/brochures/sun-sree.pdf",
      videoUrl: "https://www.youtube.com/embed/sample4",
      phone: "+919876543213",
      whatsapp: "+919876543213",
      coords: { lat: 16.5062, lng: 80.6480 },
      types: ["4BHK", "2BHK"]
    }
  ]
};

// Utility functions
function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

function cleanPhoneNumber(phone) {
  return phone.replace(/[^0-9+]/g, '');
}

//components

function LocationCard({ location, onClick }) {
  return (
    <div 
      className="location-card"
      onClick={onClick} // Add this line
      style={{ 
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${location.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        cursor: 'pointer' // Add pointer cursor
      }}
    >
      <div className="card-content">
        <div className="location-icon">
          {location.name.charAt(0)}
        </div>
        <h3>{location.name}</h3>
        <p className="highlight">{location.highlight}</p>
        <p className="plot-count">
          {PROPERTY_DATA.plots.filter(p => p.location === location.name).length} plots available
        </p>
      </div>
    </div>
  );
}

// Plot Detail Component
function PlotDetail({ plot }) {
  const [showMap, setShowMap] = useState(false);
  const [contactModal, setContactModal] = useState(false);
  
  const mapUrl = `https://www.google.com/maps/embed/v1/view?key=YOUR_API_KEY&center=${plot.coords.lat},${plot.coords.lng}&zoom=16`;
  const whatsappUrl = `https://wa.me/${cleanPhoneNumber(plot.whatsapp)}?text=I'm interested in ${plot.title}`;
  const jitsiUrl = `https://meet.jit.si/Property-${plot.id}`;

  return (
    <div className="plot-detail">
      <h2>{plot.title}</h2>
      
      <div className="plot-info">
        <div>
          <p><strong>Total Area:</strong> {plot.totalArea}</p>
          <p><strong>Plot Size:</strong> {plot.plotSize}</p>
          <p><strong>Rate:</strong> {formatCurrency(plot.pricePerSqft)} / sqft</p>
        </div>
        
        <div className="plot-actions">
          <a 
            href={plot.brochureUrl} 
            download 
            className="action-btn download"
          >
            Download Brochure
          </a>
          
          <button 
            onClick={() => setContactModal(true)}
            className="action-btn contact"
          >
            Contact Owner
          </button>
          
          {plot.videoUrl !== "#" && (
            <a 
              href={plot.videoUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="action-btn video"
            >
              View Video
            </a>
          )}
          
          <button 
            onClick={() => setShowMap(!showMap)}
            className="map-btn"
          >
            {showMap ? 'Hide Map' : 'Show Location'}
          </button>
        </div>
      </div>
      
      {showMap && (
        <div className="map-container">
          <iframe
            title={`${plot.id}-map`}
            src={mapUrl}
            allowFullScreen
          />
        </div>
      )}
      
      {contactModal && (
        <div className="contact-modal">
          <div className="modal-content">
            <h3>Contact Options</h3>
            <button onClick={() => setContactModal(false)} className="close-btn">
              &times;
            </button>
            
            <div className="contact-options">
              <a href={`tel:${cleanPhoneNumber(plot.phone)}`} className="contact-option call">
                <span>Call Owner</span>
              </a>
              
              <a 
                href={whatsappUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="contact-option whatsapp"
              >
                <span>WhatsApp</span>
              </a>
              
              <a 
                href={jitsiUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="contact-option video-call"
              >
                <span>Video Call</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Property Types Component
function PropertyTypes() {
  const propertyTypes = [...new Set(PROPERTY_DATA.plots.flatMap(plot => plot.types))];
  
  return (
    <div className="property-types">
      <h2>Available Property Types</h2>
      <div className="types-grid">
        {propertyTypes.map(type => (
          <Link to={`/properties/${type.toLowerCase()}`} key={type} className="type-card">
            <h3>{type}</h3>
            <p>Available at:</p>
            <div className="locations">
              {PROPERTY_DATA.locations.filter(loc => 
                PROPERTY_DATA.plots.some(plot => 
                  plot.location === loc.name && plot.types.includes(type)
                )
              ).map(loc => (
                <span key={loc.name} className="location-tag">{loc.name}</span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function HomePage() {
  const navigate = useNavigate();
  
  return (
    <div className="home-page">
      <h1>Premium Property Investments</h1>
      <p className="subtitle">Select your preferred investment zone</p>
      <div className="locations-grid">
        {PROPERTY_DATA.locations.map(location => (
          <LocationCard
            key={location.name}
            location={location}
            onClick={() => navigate(`/location/${encodeURIComponent(location.name)}`)}
          />
        ))}
      </div>
    </div>
  );
}

function LocationPage() {
  const { location } = useParams();
  const decodedLocation = decodeURIComponent(location);
  const locationPlots = PROPERTY_DATA.plots.filter(p => p.location === decodedLocation);
  
  return (
    <div className="location-page">
      <Link to="/" className="back-link">← Back to Locations</Link>
      <h1>{decodedLocation} Properties</h1>
      <div className="plots-list">
        {locationPlots.map(plot => (
          <PlotDetail key={plot.id} plot={plot} />
        ))}
      </div>
    </div>
  );
}

function FilteredProperties() {
  const { type } = useParams();
  const navigate = useNavigate();
  const filteredPlots = PROPERTY_DATA.plots.filter(plot => 
    plot.types.some(t => t.toLowerCase() === type.toLowerCase())
  );

  return (
    <div className="filtered-properties">
      <button onClick={() => navigate(-1)} className="back-link">
        ← Back to Property Types
      </button>
      <h1>{type.charAt(0).toUpperCase() + type.slice(1)} Properties</h1>
      {filteredPlots.length > 0 ? (
        <div className="plots-grid">
          {filteredPlots.map(plot => (
            <div key={plot.id} className="property-card">
              <h3>{plot.title}</h3>
              <p><strong>Location:</strong> {plot.location}</p>
              <p><strong>Plot Size:</strong> {plot.plotSize}</p>
              <p><strong>Price:</strong> {formatCurrency(plot.pricePerSqft * parseInt(plot.plotSize))}</p>
              <button 
                onClick={() => navigate(`/location/${encodeURIComponent(plot.location)}`)}
                className="view-details-btn"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-properties">No {type} properties found.</p>
      )}
    </div>
  );
}

function AppDescription() {
  return (
    <section className="app-description">
      <div className="description-content">
        <h2>Why Choose Value Invest Zone?</h2>
        <p>
          We specialize in identifying and offering premium property investments in Vijayawada's 
          fastest-growing areas. Our carefully selected plots and villas combine exceptional 
          location advantages with strong growth potential.
        </p>
        <div className="features-grid">
          <div className="feature">
            <span className="feature-icon">📍</span>
            <h3>Prime Locations</h3>
            <p>Strategically positioned in high-growth corridors</p>
          </div>
          <div className="feature">
            <span className="feature-icon">📊</span>
            <h3>Transparent Pricing</h3>
            <p>No hidden costs with clear documentation</p>
          </div>
          <div className="feature">
            <span className="feature-icon">🛡️</span>
            <h3>Legal Assurance</h3>
            <p>100% verified titles and approvals</p>
          </div>
        </div>
        <div className="cta-container">
          <Link to="/contact" className="cta-button">
            Get Personalized Advice
          </Link>
        </div>
      </div>
    </section>
  );
}

function LoadingSkeleton() {
  return <div className="app-loading">Loading...</div>;
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <div className="app-container">
          <header className="app-header">
            <div className="header-content">
              <Link to="/" className="logo">VALUE INVEST ZONE</Link>
              <nav>
                <Link to="/">Home</Link>
                <Link to="/property-types">Property Types</Link>
                <Link to="/contact">Contact</Link>
              </nav>
            </div>
          </header>

          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/location/:location" element={<LocationPage />} />
              <Route path="/property-types" element={<PropertyTypes />} />
              <Route path="/properties/:type" element={<FilteredProperties />} />
            </Routes>
          </main>

          <AppDescription />

          <footer className="app-footer">
            <div className="footer-content">
              <div className="footer-section">
                <h3>VALUE INVEST ZONE</h3>
                <p>Premium property investment solutions</p>
              </div>
              <div className="footer-section">
                <h4>Quick Links</h4>
                <Link to="/">Home</Link>
                <Link to="/property-types">Properties</Link>
              </div>
              <div className="footer-section">
                <h4>Contact</h4>
                <p>+91 98765 43210</p>
                <p>info@valueinvestzone.com</p>
              </div>
            </div>
            <div className="footer-bottom">
              <p>© {new Date().getFullYear()} VALUE INVEST ZONE. All rights reserved.</p>
            </div>
          </footer>
        </div>
      )}
    </Router>
  );
}

export default App;
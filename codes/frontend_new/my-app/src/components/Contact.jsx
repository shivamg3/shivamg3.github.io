import React from 'react'; // We don't need useState for now
import { Link } from 'react-router-dom'; // Essential for navigation


const ContactPage = () => {
  // --- BACKEND LOGIC (COMMENTED OUT FOR NOW) ---
  // To make the form functional, uncomment these lines and the form-related attributes in the JSX.
  /*
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to send form data to a service like Netlify, Formspree, or your own API
    console.log('Form submitted:', formData);
    setSubmitted(true);
  };
  */
  // --- END OF COMMENTED OUT LOGIC ---

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {/* Home Button - Fixed in top left corner */}
      <Link 
        to="/" 
        className="fixed top-6 left-6 z-50 group"
      >
        <div className="bg-white/10 hover:bg-white/20 backdrop-blur-lg border border-white/30 rounded-full p-3 shadow-lg transition-all duration-300 group-hover:scale-110">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6 text-yellow-300" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
            />
          </svg>
        </div>
        <span className="absolute left-full ml-2 px-2 py-1 bg-white/10 text-xs text-white/80 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          Back Home
        </span>
      </Link>      
      {/* The main glassmorphism card */}
      <div className="relative z-10 bg-white/10 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl w-full max-w-6xl p-8 sm:p-12">
        
        <div className="flex flex-col lg:flex-row gap-12">

          {/* --- LEFT COLUMN: CONTACT INFO --- */}
          <div className="w-full lg:w-1/3">
            <h1 className="text-4xl font-bold mb-4 text-yellow-300">Get in Touch</h1>
            <p className="text-lg text-gray-200/90 mb-8">
              Have a project in mind, a question, or just want to connect? Feel free to send me a message or reach out through my socials.
            </p>

            <div className="space-y-6">
              {/* Email */}
              <div className="flex items-center gap-4">
                <div className="bg-white/10 p-3 rounded-full">
                  <svg className="w-6 h-6 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-100">Email</h3>
                  <a href="mailto:shivam939a8@gmail.com" className="text-gray-300 hover:text-yellow-300 transition">shivam939a8@gmail.com</a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-4">
                <div className="bg-white/10 p-3 rounded-full">
                  <svg className="w-6 h-6 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-100">Location</h3>
                  <p className="text-gray-300">Urbana, Illinois</p>
                </div>
              </div>

              {/* --- Social Links (UPDATED) --- */}
              <div className="flex items-center gap-4 pt-4">
                  <a href="https://www.linkedin.com/in/shivam-garg-iitd/" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-3 rounded-full hover:bg-yellow-400/20 transition-all hover:scale-110"><svg className="w-6 h-6" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><title>LinkedIn</title><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/></svg></a>
                  <a href="https://github.com/shivamg3" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-3 rounded-full hover:bg-yellow-400/20 transition-all hover:scale-110"><svg className="w-6 h-6" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><title>GitHub</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg></a>
              </div>
            </div>
          </div>
          
          {/* --- RIGHT COLUMN: CONTACT FORM --- */}
          <div className="w-full lg:w-2/3">
            <h2 className="text-3xl font-bold mb-8 text-gray-100">Send a Message</h2>
            
            {/* The form is currently a div. Change to a <form> tag and add onSubmit={handleSubmit} to enable. */}
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-6">
                    <div className="w-full sm:w-1/2">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                        <input type="text" id="name" name="name" placeholder="" className="bg-white/5 border border-white/20 placeholder-gray-400 rounded-xl px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"/>
                    </div>
                    <div className="w-full sm:w-1/2">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                        <input type="email" id="email" name="email" placeholder="" className="bg-white/5 border border-white/20 placeholder-gray-400 rounded-xl px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"/>
                    </div>
                </div>
                <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
                    <input type="text" id="subject" name="subject" placeholder="" className="bg-white/5 border border-white/20 placeholder-gray-400 rounded-xl px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"/>
                </div>
                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                    <textarea id="message" name="message" rows="5" placeholder="" className="bg-white/5 border border-white/20 placeholder-gray-400 rounded-xl px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"></textarea>
                </div>
                <div>
                    <button className="bg-yellow-400 text-gray-900 font-bold rounded-xl px-8 py-3 hover:bg-yellow-300 transition-transform hover:scale-105 w-full sm:w-auto">
                        Send Message
                    </button>
                </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactPage;
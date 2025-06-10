//I'm looking for a website that showcases camera products with feature highlights, a photo gallery, product details, and a newsletter signup.
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const cameraProducts = [
  {
    id: 1,
    name: "Alpha Pro",
    price: 2499,
    image:
      "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=600",
    description:
      "Our most advanced camera featuring a 50MP sensor, 8K video recording, and a revolutionary autofocus system with real-time tracking.",
    features: [
      "50MP Full-Frame Sensor",
      "8K 30fps & 4K 120fps Video",
      "Real-time Animal & Human AF",
      "10fps Burst Shooting",
      "In-body Image Stabilization",
      "Weather-resistant Construction",
    ],
    specs: {
      sensor: "50MP Full-Frame CMOS",
      iso: "100-102400 (expandable to 50-204800)",
      burst: "10fps (mechanical shutter), 20fps (electronic)",
      video: "8K @ 30fps, 4K @ 120fps",
      screen: '3.2" Tilting Touchscreen (2,100,000 dots)',
      battery: "Approx. 705 shots per charge",
    },
    gallery: [
      "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/2333810/pexels-photo-2333810.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/31696056/pexels-photo-31696056/free-photo-of-canon-camera-lens-on-wooden-surface.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/31696075/pexels-photo-31696075/free-photo-of-professional-camera-equipment-setup-with-dslr-camera-lens-telephoto-lens-and-tripod-outdoors.jpeg?auto=compress&cs=tinysrgb&w=600",
    ],
  },
  {
    id: 2,
    name: "Quantum Mirror",
    price: 1799,
    image:
      "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=600",
    description:
      "Compact mirrorless camera with a 42MP sensor, 4K video, and an innovative in-body stabilization system.",
    features: [
      "42MP APS-C Sensor",
      "4K 30fps Video Recording",
      "5-axis In-body Stabilization",
      "15fps Burst Shooting",
      "Real-time Eye AF",
      "Fully Articulated Touchscreen",
    ],
    specs: {
      sensor: "42MP APS-C CMOS",
      iso: "100-51200 (expandable to 50-204800)",
      burst: "15fps (mechanical), 20fps (electronic)",
      video: "4K @ 30fps, Full HD @ 120fps",
      screen: '3.0" Fully Articulated Touchscreen (1,040,000 dots)',
      battery: "Approx. 500 shots per charge",
    },
    gallery: [
      "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=600",
    ],
  },
  {
    id: 3,
    name: "Photon X5",
    price: 1299,
    image:
      "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=600",
    description:
      "Professional DSLR with a 24MP sensor, 4K video capabilities, and an advanced autofocus system.",
    features: [
      "24MP Full-Frame Sensor",
      "4K UHD Video Recording",
      "273-point Phase Detection AF",
      "7fps Burst Shooting",
      "ISO Range 100-51200",
      "Built-in Wi-Fi & GPS",
    ],
    specs: {
      sensor: "24MP Full-Frame CMOS",
      iso: "100-51200 (expandable to 50-204800)",
      burst: "7fps (mechanical), 10fps (continuous)",
      video: "4K @ 30fps, Full HD @ 120fps",
      screen: '3.2" Fixed Touchscreen (1,040,000 dots)',
      battery: "Approx. 750 shots per charge",
    },
    gallery: [
      "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=600",
    ],
  },
];

const features = [
  {
    icon: "M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z",
    title: "Advanced Sensor Technology",
    description:
      "Cutting-edge sensors deliver exceptional image quality in all lighting conditions.",
  },
  {
    icon: "M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z",
    title: "Precision Optics",
    description:
      "Premium lenses optimized for maximum sharpness and minimal distortion.",
  },
  {
    icon: "M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z",
    title: "Seamless Connectivity",
    description:
      "Built-in Wi-Fi and Bluetooth for easy sharing and remote control capabilities.",
  },
];

const galleryImages = [
  "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/2333810/pexels-photo-2333810.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/31696056/pexels-photo-31696056/free-photo-of-canon-camera-lens-on-wooden-surface.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/31696075/pexels-photo-31696075/free-photo-of-professional-camera-equipment-setup-with-dslr-camera-lens-telephoto-lens-and-tripod-outdoors.jpeg?auto=compress&cs=tinysrgb&w=600",
];

const App = () => {
  const [showProductModal, setShowProductModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [showNewsletterModal, setShowNewsletterModal] = useState(false);
  const [email, setEmail] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [activeTab, setActiveTab] = useState("details");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openProductModal = (product: any) => {
    setSelectedProduct(product);
    setShowProductModal(true);
  };

  const closeProductModal = () => {
    setShowProductModal(false);
    setTimeout(() => {
      setSelectedProduct(null);
      setActiveTab("details");
      setCurrentImageIndex(0);
    }, 300);
  };

  const openNewsletterModal = () => {
    setShowNewsletterModal(true);
  };

  const closeNewsletterModal = () => {
    setShowNewsletterModal(false);
    setEmail("");
  };

  const handleSubscribe = () => {
    if (email.includes("@")) {
      setShowAlert(true);
      setEmail("");
      setTimeout(() => {
        setShowAlert(false);
        closeNewsletterModal();
      }, 2000);
    }
  };

  const tabVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <header className="mb-12 text-center relative">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-0 right-0 w-96 h-96 bg-teal-400 rounded-full filter blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-500 rounded-full filter blur-3xl animate-pulse delay-2000"></div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-purple-500 relative z-10">
              Vision Pro Cameras
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg md:text-xl max-w-2xl mx-auto text-slate-300 relative z-10"
          >
            Professional cameras for creators who demand the absolute best.
          </motion.p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {cameraProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-slate-800 rounded-xl overflow-hidden shadow-2xl hover:shadow-teal-500/20 transition-all duration-300 group relative"
            >
              <div className="relative overflow-hidden h-56">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                  <div className="flex space-x-2">
                    <span className="bg-teal-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      New
                    </span>
                    <span className="bg-purple-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      Pro
                    </span>
                  </div>
                  <p className="text-white text-lg font-bold">
                    ${product.price}
                  </p>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-teal-400 transition-colors duration-300">
                  {product.name}
                </h3>
                <p className="text-slate-400 mb-4 text-sm line-clamp-2">
                  {product.description}
                </p>

                <div className="mb-4">
                  <ul className="text-xs text-slate-300 space-y-1">
                    {product.features.slice(0, 3).map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3 w-3 text-teal-400 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex justify-between items-center">
                  <button
                    onClick={() => openProductModal(product)}
                    className="bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-teal-500/20"
                  >
                    View Details
                  </button>
                  <button className="text-slate-400 hover:text-white transition-colors duration-300 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                    Save
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-purple-500">
              Our Promise
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              Vision Pro is committed to delivering the highest quality imaging
              experience through innovation, precision engineering, and
              exceptional customer support.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-slate-800 rounded-xl p-8 shadow-xl hover:shadow-teal-500/10 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 to-purple-500"></div>

                <div className="mb-4">
                  <div className="w-16 h-16 bg-teal-500/10 rounded-full flex items-center justify-center mx-auto">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-teal-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={feature.icon}
                      />
                    </svg>
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-2 text-white">
                  {feature.title}
                </h3>
                <p className="text-slate-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-purple-500">
              The Vision Pro Gallery
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              Professional photography captured with our advanced camera systems
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            {galleryImages.slice(0, 4).map((img, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ y: -5, scale: 1.03 }}
                className="relative overflow-hidden rounded-xl shadow-xl"
              >
                <img
                  src={img || "/placeholder.svg"}
                  alt={`Gallery image ${index + 1}`}
                  className="w-full h-64 object-cover"
                />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.03 }}
            className="relative overflow-hidden rounded-xl shadow-xl max-w-4xl mx-auto"
          >
            <img
              src={galleryImages[4] || "/placeholder.svg"}
              alt="Featured gallery image"
              className="w-full h-96 object-cover"
            />
          </motion.div>
        </div>

        <div className="mb-16 bg-slate-800 rounded-xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div className="w-full h-full bg-[url('/noise.png')]"></div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8 relative z-10"
          >
            <h2 className="text-3xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-purple-500">
              Stay Updated
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              Subscribe to our newsletter for the latest in camera technology,
              tutorials, and exclusive offers.
            </p>
          </motion.div>

          <div className="max-w-md mx-auto relative z-10">
            <div className="flex shadow-xl">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-l-lg bg-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300"
              />
              <button
                onClick={openNewsletterModal}
                className="bg-teal-500 hover:bg-teal-600 text-white font-medium px-6 py-3 rounded-r-lg transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/20"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <footer className="text-center text-slate-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Vision Pro Cameras</p>
        </footer>

        <AnimatePresence>
          {showProductModal && selectedProduct && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
              onClick={closeProductModal}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-slate-900 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl relative"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 to-purple-500"></div>

                <div className="flex flex-col lg:flex-row">
                  <div className="lg:w-1/2 relative">
                    <div className="absolute top-4 right-4 z-10 flex space-x-2">
                      <button
                        onClick={closeProductModal}
                        className="bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-80 transition-all duration-300"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>

                    <div className="relative h-64 lg:h-full">
                      <img
                        src={
                          selectedProduct.gallery[currentImageIndex] ||
                          "/placeholder.svg"
                        }
                        alt={`${selectedProduct.name} gallery`}
                        className="w-full h-full object-cover"
                      />

                      {currentImageIndex > 0 && (
                        <button
                          onClick={() =>
                            setCurrentImageIndex(currentImageIndex - 1)
                          }
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-80 transition-all duration-300"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 19l-7-7 7-7"
                            />
                          </svg>
                        </button>
                      )}

                      {currentImageIndex <
                        selectedProduct.gallery.length - 1 && (
                        <button
                          onClick={() =>
                            setCurrentImageIndex(currentImageIndex + 1)
                          }
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-80 transition-all duration-300"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="lg:w-1/2 p-6 lg:p-8 overflow-y-auto">
                    <h2 className="text-2xl lg:text-3xl font-bold mb-2 text-white">
                      {selectedProduct.name}
                    </h2>
                    <p className="text-2xl font-bold text-teal-400 mb-4">
                      ${selectedProduct.price}
                    </p>
                    <p className="text-slate-300 mb-6">
                      {selectedProduct.description}
                    </p>

                    <div className="flex border-b border-slate-700 mb-6">
                      <button
                        onClick={() => setActiveTab("details")}
                        className={`pb-4 pt-2 mr-8 font-medium ${
                          activeTab === "details"
                            ? "text-teal-400 border-b-2 border-teal-400"
                            : "text-slate-400 hover:text-white"
                        }`}
                      >
                        Details
                      </button>
                      <button
                        onClick={() => setActiveTab("specs")}
                        className={`pb-4 pt-2 font-medium ${
                          activeTab === "specs"
                            ? "text-teal-400 border-b-2 border-teal-400"
                            : "text-slate-400 hover:text-white"
                        }`}
                      >
                        Specifications
                      </button>
                    </div>

                    <div className="relative h-64">
                      <AnimatePresence mode="wait">
                        {activeTab === "details" && (
                          <motion.div
                            key="details"
                            variants={tabVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            transition={{ duration: 0.3 }}
                            className="absolute top-0 left-0 w-full"
                          >
                            <h3 className="text-lg font-bold mb-4 text-white">
                              Key Features
                            </h3>
                            <ul className="space-y-3 mb-6">
                              {selectedProduct.features.map(
                                (feature: any, index: any) => (
                                  <li key={index} className="flex items-start">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-5 w-5 text-teal-400 mr-2 flex-shrink-0 mt-0.5"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 13l4 4L19 7"
                                      />
                                    </svg>
                                    <span className="text-slate-300">
                                      {feature}
                                    </span>
                                  </li>
                                )
                              )}
                            </ul>
                          </motion.div>
                        )}

                        {activeTab === "specs" && (
                          <motion.div
                            key="specs"
                            variants={tabVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            transition={{ duration: 0.3 }}
                            className="absolute top-0 left-0 w-full"
                          >
                            <h3 className="text-lg font-bold mb-4 text-white">
                              Technical Specifications
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              {Object.entries(selectedProduct.specs).map(
                                ([key, value]) => (
                                  <div
                                    key={key}
                                    className="bg-slate-800 rounded-lg p-4"
                                  >
                                    <p className="text-xs text-slate-400 uppercase font-medium mb-1">
                                      {key.charAt(0).toUpperCase() +
                                        key.slice(1)}
                                    </p>
                                    <p className="text-base text-white font-medium">
                                      {value as string}
                                    </p>
                                  </div>
                                )
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <div className="flex mt-16">
                      <button className="flex-1 bg-teal-500 hover:bg-teal-600 text-white font-medium py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/20 mr-4">
                        Add to Cart
                      </button>
                      <button className="bg-slate-800 hover:bg-slate-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                        </svg>
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showNewsletterModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
              onClick={closeNewsletterModal}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-slate-900 rounded-xl max-w-md w-full p-8 shadow-2xl relative"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 to-purple-500"></div>

                <h2 className="text-2xl font-bold mb-4 text-white">
                  Subscribe to Vision Pro
                </h2>
                <p className="text-slate-300 mb-6">
                  Enter your email to stay updated with our latest products,
                  tutorials, and special offers.
                </p>

                <div className="mb-6">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-slate-300 mb-1"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-lg bg-slate-800 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300"
                  />
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={handleSubscribe}
                    className="flex-1 bg-teal-500 hover:bg-teal-600 text-white font-medium py- text-white font-medium py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/20"
                  >
                    Subscribe
                  </button>
                  <button
                    onClick={closeNewsletterModal}
                    className="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-medium py-3 rounded-lg transition-all duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showAlert && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="fixed bottom-8 right-8 bg-teal-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>Successfully subscribed to our newsletter!</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default App;
// Zod Schema
export const Schema = {
    "commentary": "To create a website that showcases camera products, I will design a layout with a navigation bar, a carousel for featured products, a grid for product listings, and a newsletter signup form. The website will be built using Next.js and Tailwind CSS for styling.",
    "template": "nextjs-developer",
    "title": "Camera Showcase",
    "description": "A website showcasing camera products with feature highlights, a photo gallery, product details, and a newsletter signup.",
    "additional_dependencies": [
        "framer-motion"
    ],
    "has_additional_dependencies": true,
    "install_dependencies_command": "npm install framer-motion",
    "port": 3000,
    "file_path": "pages/index.tsx",
    "code": "<see code above>"
}

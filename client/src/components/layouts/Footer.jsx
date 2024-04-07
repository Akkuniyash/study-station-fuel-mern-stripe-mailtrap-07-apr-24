import React from "react";
import {motion} from 'framer-motion'
const Footer = () => {
  return (
    <section id="contact">
      <div className="container box">
        <div className="row">
          <motion.div className="col-lg-6 col-md-6 col-12 collegeImg"
           initial={{
            opacity: 0,
            // if odd index card,slide from right instead of left
            x:-50,
          }}
          whileInView={{
            opacity: 1,
            x: 0, // Slide in to its original position
            transition: {
              duration: 0.75, // Animation duration
            },
          }}
          viewport={{ once: true }}>
            <img
              src="/images/college.png"
              className="img-fluid "
              alt=""
            />
          </motion.div>
          <motion.div className="col-lg-6 col-md-6 col-12 contact "
           initial={{
            opacity: 0,
            // if odd index card,slide from right instead of left
            x:50,
          }}
          whileInView={{
            opacity: 1,
            x: 0, // Slide in to its original position
            transition: {
              duration: 0.75, // Animation duration
            },
          }}
          viewport={{ once: true }}>
            <h1 className="contactUs">Contact Us</h1>
            <form action="https://api.web3forms.com/submit" method="POST" className="contact">
            <input type="hidden" name="access_key" value="e256e3c8-6993-4bb7-b4bb-2b55b2a45340" />
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Enter Your Name"
              />
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter Your Email"
              />
              <textarea
                className="form-control"
                placeholder="Enter Your Message"
                name="message"
              ></textarea>
              <motion.button type="submit" className="btn btn0 mt-4 sendBtn"
                                              whileTap={{ scale: 0.85 }}

              >Send</motion.button>
            </form>
          </motion.div>
          <h4 className="text-center mt-5 ">Copyrights Reserved 2023-2024</h4>
        </div>
      </div>
    </section>
  );
};

export default Footer;

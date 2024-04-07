import React from "react";
import {motion} from 'framer-motion'
const About = () => {
  return (
    <section id="about">
      <div className="container-fluid">
        <div className="row">
          <motion.div className="col-lg-6 col-md-6 col-12 "
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
          viewport={{ once: true }}
          >
            <img
              className="img-fluid aboutpic"
              src="/images/20240224_142631.png"
              alt=""
            />
          </motion.div>
          <motion.div className="col-lg-6 col-md-6 col-12 p-2 p-lg-5 my-5  "
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
          viewport={{ once: true }}
          >
            <h1>About Us</h1>
            <p>
Welcome to Alpha Arts and Science College's revolutionary canteen e-commerce platform! We are dedicated to combating food shortages and minimizing wastage through our innovative approach. With our user-friendly interface, you can order delicious meals with just a few clicks, ensuring convenience for busy students and staff. By offering half payment for orders, we aim to make quality food accessible to everyone while promoting responsible consumption. Join us in our mission to foster sustainability and efficiency in dining experiences. Together, let's make a positive impact on our community and the environment, one meal at a time
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;

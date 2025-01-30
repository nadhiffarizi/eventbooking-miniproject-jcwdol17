import React from "react";
import Link from "next/link";

const about: React.FC = () => {
  return (
    <section className="about-us bg-gray-50 py-10 px-6">
      <div className="max-w-full lg:max-full mx-auto text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">About Us</h1>
        <p className="text-gray-600 text-lg mb-6">
          Welcome to <strong>Vitae</strong>, your ultimate destination for
          discovering and attending the most exciting events. Our platform
          enables everyone to easily book tickets for a variety of events,
          covering categories such as entertainment, hobbies, music, food and
          beverages, as well as business-related gatherings. At Vitae, we are
          committed to connecting people with experiences that inspire,
          entertain, and create unforgettable memories. Whether you are a music
          enthusiast, a food lover, or a professional looking to network, Vitae
          is here to make it all happen effortlessly.
        </p>
        <p className="text-gray-600 text-lg mb-6">
          We are more than just an event platform; we are a community hub where
          people come together to share experiences, celebrate life is moments,
          and build lasting connections. We pride ourselves on curating events
          that cater to diverse interests, ensuring there is something for
          everyone to enjoy. Whether you are looking for a night of live music,
          a weekend festival, a professional conference, or a casual gathering
          with friends, Vitae is the place to be.
        </p>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-3">
            Our Mission
          </h2>
          <p className="text-gray-600 mb-6">
            Our mission at Vitae is to create a vibrant community by connecting
            people through diverse events. We strive to foster connections,
            spark joy, and open up a world of opportunities in every moment. We
            believe in the power of events to bring people together, create
            lasting memories, and inspire positive change. We also believe in
            the importance of accessibility and inclusivity, ensuring that
            everyone has the chance to participate in and enjoy our events. Our
            commitment extends to providing a platform that not only showcases a
            variety of events but also encourages collaboration and creativity
            among attendees. We aim to empower individuals to share their
            stories and experiences, enriching the community and fostering a
            sense of belonging. We also prioritize sustainability, ensuring that
            our events are environmentally friendly and socially responsible.
            Whether you are seeking entertainment, education, networking, or
            simply a chance to connect with like-minded individuals, Vitae is
            the platform for you. We are dedicated to curating a diverse range
            of events that cater to all interests and backgrounds, ensuring that
            there is something for everyone to enjoy. Join us on this exciting
            journey as we transform the way people experience and connect with
            events!
          </p>
        </div>
        <div className="flex justify-center gap-4 mt-8">
          <Link
            href="/events"
            className="text-blue-600 hover:underline font-medium">
            Explore Events
          </Link>
          <Link
            href="/contact"
            className="text-blue-600 hover:underline font-medium">
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
};

export default about;

import { useEffect, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const faqsData = [
  {
    question: "What is GeekMate?",
    answer: "GeekMate is an interactive community platform for developers and tech enthusiasts to connect, share knowledge, and grow together.",
  },
  {
    question: "How can I join GeekMate?",
    answer: "You can join GeekMate by signing up on our platform and creating a profile to start interacting with the community.",
  },
  {
    question: "What features does GeekMate offer?",
    answer: "GeekMate offers features like connecting with other geeks of similar interests in technology, and a space for sharing resources and learning.",
  },
  {
    question: "Is GeekMate free to use?",
    answer: "Yes, GeekMate is free to use, all teh features are fully accessible as of now.",
  },
];

const Faqs = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(".faq-item", {
      opacity: 0,
      y: 50,
      duration: 4,
      stagger: 0.2,
      scrollTrigger: {
        trigger: ".faqs-container",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        toggleActions: "play none none reverse",
      },
    });
  }, []);

  const [openindex, setopenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setopenIndex(openindex === index ? null : index);
  };

  return (
    <div className="faqs-component px-8 py-20 flex flex-col items-center bg-gradient-to-b from-custom1 to-custom2">
      <h1 className="title big-text font-bold text-4xl text-center mb-20">
        <span className="">F</span>requently
        <span className=""> A</span>sked
        <span className=""> Q</span>uestions
      </h1>

      <div className="px-10 w-7/12 ques-container">
        {faqsData.map((faq, index) => (
          <div
            key={index}
            className={`mb-5 rounded-full transition-transform transform hover:-translate-y-3 hover:shadow-lg duration-300 border ${openindex === index ? "border-secondary" : "border-primary"}`}
          >
            <div
              className="ques-box flex justify-between px-6 py-1 m-4 cursor-pointer space-y-3"
              onClick={() => toggleFAQ(index)}
            >
              <h2 className="font-bold text-lg flex-1 text-left my-auto">{faq.question}</h2>
              <span className="text-2xl  font-bold mx-4">
                {openindex === index ? "-" : "+"}
              </span>
            </div>
            <div
              className={`px-6 py-3 overflow-hidden transition-all duration-900 ease-in-out ${
                openindex === index ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <p className="font-semibold m-3">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faqs;

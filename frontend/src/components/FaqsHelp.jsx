import React, { useState } from "react";
import Searchbar from "./mini_components/Searchbar";
import Topbar from "./mini_components/Topbar";
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';

const FaqsHelp = () => {
  const [active, setActive] = useState({
    i: 0,
    index: 0
  });
  const [activeNav, setActiveNav] = useState(0);
  const AccordionData =
    [

      {
        content: {
          title: "General",
          data: [
            {
              "name": "How do I add a question?",
              "acceptedAnswer": {
                "text": "Just click on the \"Add a Question\" button at the end of the current questions."
              }
            },
            {
              "name": "How do I edit a question and its answer?",
              "acceptedAnswer": {
                "text": "You can click on this question text to open an editor, or to the right of every question is an edit icon."
              }
            },
            {
              "name": "How do I delete a question?",
              "acceptedAnswer": {
                "text": "To the right of every question is a delete icon. Click on that to remove the question."
              }
            },
            {
              "name": "How do I change the order of questions?",
              "acceptedAnswer": {
                "text": "To the left of each question is an icon that you can use to drag questions to a new location."
              }
            },
            {
              "name": "🗑️ I want to start afreshHow do I get rid of these questions?",
              "acceptedAnswer": {
                "text": "To the top right is a button to clear all the contents of the editor."
              }
            },
            {
              "name": "😎 Are Emojis hown in the FAQ search results rich snippets?",
              "acceptedAnswer": {
                "text": "At this time, we see Emojis howing in both the questions and answers. As you can see, this editor supports pasting in Emojis. We&#39;ve also developed our <a href=\"https://classyschema.org/Emoji\" target=\"_blank\">Classy Emojis</a> system based on our Classy Unicode script to help people include emojis when their CMS does not let them."
              }
            },
            {
              "name": "❓ What other helpers do you provide?",
              "acceptedAnswer": {
                "text": "We have tools to help you generate <strong><em>json-ld</em></strong> and <strong><em>microdata </em></strong>for:<h3>📽️ Videos</h3>Single video pages and collections of videos can how up in rich snippets. <a href=\"https://classyschema.org/Video\" target=\"_blank\">Our helper</a> also supports defining clips.<h3>How tos</h3><a href=\"https://classyschema.orgHowTo\" target=\"_blank\">This helper</a> supports all required and recommended fields as well as more advanced options like sections and linking to videos and clips via IDs.<h3>🙋 FAQ Pages</h3>You&#39;re looking at it. <a href=\"https://classyschema.org/FAQPage\" target=\"_blank\">This helper</a> generates rich snippets that expand your pages normal result by howing a series of questions with expandable answers."
              }
            }
          ]
        }
      },
      {
        content: {
          title: "Seekers",
          data: [
            {
              "name": "How do I add a question?",
              "acceptedAnswer": {
                "text": "Just click on the \"Add a Question\" button at the end of the current questions."
              }
            },
            {
              "name": "How do I edit a question and its answer?",
              "acceptedAnswer": {
                "text": "You can click on this question text to open an editor, or to the right of every question is an edit icon."
              }
            },
            {
              "name": "How do I delete a question?",
              "acceptedAnswer": {
                "text": "To the right of every question is a delete icon. Click on that to remove the question."
              }
            },
            {
              "name": "How do I change the order of questions?",
              "acceptedAnswer": {
                "text": "To the left of each question is an icon that you can use to drag questions to a new location."
              }
            },
            {
              "name": "🗑️ I want to start afreshHow do I get rid of these questions?",
              "acceptedAnswer": {
                "text": "To the top right is a button to clear all the contents of the editor."
              }
            },
            {
              "name": "😎 Are Emojis hown in the FAQ search results rich snippets?",
              "acceptedAnswer": {
                "text": "At this time, we see Emojis howing in both the questions and answers. As you can see, this editor supports pasting in Emojis. We&#39;ve also developed our <a href=\"https://classyschema.org/Emoji\" target=\"_blank\">Classy Emojis</a> system based on our Classy Unicode script to help people include emojis when their CMS does not let them."
              }
            },
            {
              "name": "❓ What other helpers do you provide?",
              "acceptedAnswer": {
                "text": "We have tools to help you generate <strong><em>json-ld</em></strong> and <strong><em>microdata </em></strong>for:<h3>📽️ Videos</h3>Single video pages and collections of videos can how up in rich snippets. <a href=\"https://classyschema.org/Video\" target=\"_blank\">Our helper</a> also supports defining clips.<h3>How tos</h3><a href=\"https://classyschema.orgHowTo\" target=\"_blank\">This helper</a> supports all required and recommended fields as well as more advanced options like sections and linking to videos and clips via IDs.<h3>🙋 FAQ Pages</h3>You&#39;re looking at it. <a href=\"https://classyschema.org/FAQPage\" target=\"_blank\">This helper</a> generates rich snippets that expand your pages normal result by howing a series of questions with expandable answers."
              }
            }
          ]
        }
      },
      {
        content: {
          title: "Talent",
          data: [
            {
              "name": "How do I add a question?",
              "acceptedAnswer": {
                "text": "Just click on the \"Add a Question\" button at the end of the current questions."
              }
            },
            {
              "name": "How do I edit a question and its answer?",
              "acceptedAnswer": {
                "text": "You can click on this question text to open an editor, or to the right of every question is an edit icon."
              }
            },
            {
              "name": "How do I delete a question?",
              "acceptedAnswer": {
                "text": "To the right of every question is a delete icon. Click on that to remove the question."
              }
            },
            {
              "name": "How do I change the order of questions?",
              "acceptedAnswer": {
                "text": "To the left of each question is an icon that you can use to drag questions to a new location."
              }
            },
            {
              "name": "🗑️ I want to start afreshHow do I get rid of these questions?",
              "acceptedAnswer": {
                "text": "To the top right is a button to clear all the contents of the editor."
              }
            },
            {
              "name": "😎 Are Emojis hown in the FAQ search results rich snippets?",
              "acceptedAnswer": {
                "text": "At this time, we see Emojis howing in both the questions and answers. As you can see, this editor supports pasting in Emojis. We&#39;ve also developed our <a href=\"https://classyschema.org/Emoji\" target=\"_blank\">Classy Emojis</a> system based on our Classy Unicode script to help people include emojis when their CMS does not let them."
              }
            },
            {
              "name": "❓ What other helpers do you provide?",
              "acceptedAnswer": {
                "text": "We have tools to help you generate <strong><em>json-ld</em></strong> and <strong><em>microdata </em></strong>for:<h3>📽️ Videos</h3>Single video pages and collections of videos can how up in rich snippets. <a href=\"https://classyschema.org/Video\" target=\"_blank\">Our helper</a> also supports defining clips.<h3>How tos</h3><a href=\"https://classyschema.orgHowTo\" target=\"_blank\">This helper</a> supports all required and recommended fields as well as more advanced options like sections and linking to videos and clips via IDs.<h3>🙋 FAQ Pages</h3>You&#39;re looking at it. <a href=\"https://classyschema.org/FAQPage\" target=\"_blank\">This helper</a> generates rich snippets that expand your pages normal result by howing a series of questions with expandable answers."
              }
            }
          ]
        }
      },
      {
        content: {
          title: "Profile",
          data: [
            {
              "name": "How do I add a question?",
              "acceptedAnswer": {
                "text": "Just click on the \"Add a Question\" button at the end of the current questions."
              }
            },
            {
              "name": "How do I edit a question and its answer?",
              "acceptedAnswer": {
                "text": "You can click on this question text to open an editor, or to the right of every question is an edit icon."
              }
            },
            {
              "name": "How do I delete a question?",
              "acceptedAnswer": {
                "text": "To the right of every question is a delete icon. Click on that to remove the question."
              }
            },
            {
              "name": "How do I change the order of questions?",
              "acceptedAnswer": {
                "text": "To the left of each question is an icon that you can use to drag questions to a new location."
              }
            },
            {
              "name": "🗑️ I want to start afreshHow do I get rid of these questions?",
              "acceptedAnswer": {
                "text": "To the top right is a button to clear all the contents of the editor."
              }
            },
            {
              "name": "😎 Are Emojis hown in the FAQ search results rich snippets?",
              "acceptedAnswer": {
                "text": "At this time, we see Emojis howing in both the questions and answers. As you can see, this editor supports pasting in Emojis. We&#39;ve also developed our <a href=\"https://classyschema.org/Emoji\" target=\"_blank\">Classy Emojis</a> system based on our Classy Unicode script to help people include emojis when their CMS does not let them."
              }
            },
            {
              "name": "❓ What other helpers do you provide?",
              "acceptedAnswer": {
                "text": "We have tools to help you generate <strong><em>json-ld</em></strong> and <strong><em>microdata </em></strong>for:<h3>📽️ Videos</h3>Single video pages and collections of videos can how up in rich snippets. <a href=\"https://classyschema.org/Video\" target=\"_blank\">Our helper</a> also supports defining clips.<h3>How tos</h3><a href=\"https://classyschema.orgHowTo\" target=\"_blank\">This helper</a> supports all required and recommended fields as well as more advanced options like sections and linking to videos and clips via IDs.<h3>🙋 FAQ Pages</h3>You&#39;re looking at it. <a href=\"https://classyschema.org/FAQPage\" target=\"_blank\">This helper</a> generates rich snippets that expand your pages normal result by howing a series of questions with expandable answers."
              }
            }
          ]
        }
      }


    ]

  console.log("accordion", AccordionData)

  const accordionControl = (i, index) => {
    if (JSON.stringify(active) === JSON.stringify({ i, index })) {
      setActive(null)
    } else {
      setActive({ i, index })
    }
  }
  console.log("active", active)

  const scrolldown = (scrollTo) => {
    var element = document.getElementById(`${scrollTo}`);
    var headerOffset = 100;
    var elementPosition = element.getBoundingClientRect().top;
    var offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
  }

  return (
    <>
      <Topbar />
      <div className="notification p-5">
        <div className="p-4 shadow">
          <div>
            <h1 style={{ color: "#8443e5" }}>Faq's and Help </h1>
            <p className="purple_title">How we can help you?</p>
          </div>
          <Searchbar />
          <hr />
          <div className="container-fluid">
            <div className="row">
              <div class="accordion_left col-lg-4 col-12">
                <div>
                  {AccordionData.map((item, ind) => {
                    return (
                      <>
                        <h5 style={activeNav === ind ? { color: "#8748e5" } : {}} onClick={() => { setActiveNav(ind); scrolldown(item.content.title) }}>{item.content.title}</h5>
                      </>
                    )
                  })}
                </div>

              </div>
              <div class="faq_accordion col-lg-8 col-12">

                <ul>
                  {AccordionData.map((item, i) => {
                    return (
                      <>
                        <div className="section_accordion">
                          <h1 id={`${item.content.title}`}>{item.content.title}</h1>
                          {item.content.data.map((elem, index) => {
                            return (

                              <li>
                                <div className="question d-flex justify-content-between w-100"
                                  // style={active === index ? { color: "#8748e5" } : {}} 
                                  onClick={() => accordionControl(i, index)}>
                                  <h2 style={(JSON.stringify(active) === JSON.stringify({ i, index })) ? { color: "#8748e5" } : {}}>{elem.name}</h2>
                                  <div className="aa_icon">
                                    {(JSON.stringify(active) === JSON.stringify({ i, index })) ? (
                                      <BsChevronUp />
                                    ) : (
                                      <BsChevronDown />
                                    )}
                                  </div>
                                </div>
                                {
                                  (JSON.stringify(active) === JSON.stringify({ i, index })) ?
                                    <p>{elem.acceptedAnswer.text}</p>
                                    :
                                    ""
                                }


                              </li>

                            )
                          })}
                        </div>
                      </>
                    )
                  })}


                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default FaqsHelp;

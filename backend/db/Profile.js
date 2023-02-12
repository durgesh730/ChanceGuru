const mongoose = require("mongoose");

let schema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        basicInfo:
        {
            fullname: {
                type: String,
            },
            gender: {
                type: String,
            },
            DOB: {
                type: String,
                max: new Date().getFullYear(),
            },
            city: {
                type: String,
            },
            state: {
                type: String,
            },
            country: {
                type: String,
            },
            address: {
                type: String,
            },
            linkedin: {
                type: String,
            },
            facebook: {
                type: String,
            },
            instagram: {
                type: String
            }
        },

        talent:
        {
            type: {
                type: String,
            },
            height: {
                type: Number,
            },
            weight: {
                type: Number,
            },
            bodyType: {
                type: String,
            },
            skinTone: {
                type: String,
            },
            eyeColour: {
                type: String,
            },
            hairColour: {
                type: String,
            },
            hairStyle: {
                type: String,
            },
            beard: {
                type: String,
            },
            beardStyle: {
                type: String,
            },
            language: {
                type: String,
            },
            boldScenes: {
                type: Boolean,
            },
            allowances: {
                type: Boolean,
            },
            travelling: {
                type: Boolean,
            },
        },

        portfolio: {
            bio: {
                type: String
            },
            experience: [
                {
                    workIn: {
                        type: String,
                    },
                    workedAs: {
                        type: String,
                    },
                    startData: {
                        type: String,
                        max: new Date().getFullYear(),
                    },
                    endDate: {
                        type: String,
                        max: new Date().getFullYear(),
                    },
                    about: {
                        type: String,
                    },
                }
            ]
        },
        photos: [
            {
                link: {
                    type: String,
                }
            }
        ],
        videos: [
            {
                link: {
                    type: String,
                }
            }
        ],
        education: [
            {
                college: {
                    type: String,
                },
                startYear: {
                    type: Number,
                },
                endYear: {
                    type: Number,
                },
                degree: {
                    type: String,
                }
            }
        ],
        skills: [
            {
                skill: {
                    type: String,
                }
            }
        ],
        rolePref: [
            {
                role: {
                    type: String,
                }
            }
        ],
        updatedAt: {
            type: String,
        }
    },
    { collation: { locale: "en" } }
);

module.exports = mongoose.model("Profile", schema);

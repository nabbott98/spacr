///////////////////////////////////////
// Import Dependencies
///////////////////////////////////////
const mongoose = require('./connection')
const Apod = require('./apodModel')
const axios = require('axios')
const express = require('express')
const app = require("liquid-express-views")(express())
// const app = express()
app.use(express.json()) // comment this out if I run into liquid issues

///////////////////////////////////////
// Seed Script code
///////////////////////////////////////
// first we need our connection saved to a variable for easy reference
const db = mongoose.connection
let startApods = [
    {
        "copyright": "Dan Zafra",
        "date": "2022-03-12",
        "explanation": "Northern winter constellations and a long arc of the Milky Way are setting in this night skyscape looking toward the Pacific Ocean from Point Reyes on planet Earth's California coast. Sirius, alpha star of Canis Major, is prominent below the starry arc toward the left. Orion's yellowish Betelgeuse, Aldebaran in Taurus, and the blue tinted Pleiades star cluster also find themselves between Milky Way and northwestern horizon near the center of the scene. The nebulae visible in the series of exposures used to construct this panoramic view were captured in early March, but are just too faint to be seen with the unaided eye. On that northern night their expansive glow includes the reddish semi-circle of Barnard's Loop in Orion and NGC 1499 above and right of the Pleiades, also known as the California Nebula.",
        "hdurl": "https://apod.nasa.gov/apod/image/2203/PointReyesMilkyWayDanZafra.jpg",
        "media_type": "image",
        "service_version": "v1",
        "title": "Point Reyes Milky Way",
        "url": "https://apod.nasa.gov/apod/image/2203/PointReyesMilkyWayDanZafra1024.jpg"
    },
    {
        "date": "2016-04-18",
        "explanation": "The International Space Station is the largest object ever constructed by humans in space.  The station perimeter extends over roughly the area of a football field, although only a small fraction of this is composed of modules habitable by humans. The station is so large that it could not be launched all at once -- it continues to be built piecemeal.  To function, the ISS needs huge trusses, some over 15 meters long and with masses over 10,000 kilograms, to keep it rigid and to route electricity and liquid coolants.  Pictured above, the immense space station was photographed from the now-retired space shuttle Atlantis after a week-long stay in 2010. Across the image top hangs part of a bright blue Earth, in stark contrast to the darkness of interstellar space across the bottom.",
        "hdurl": "https://apod.nasa.gov/apod/image/1604/ISS02_NASA_4288.jpg",
        "media_type": "image",
        "service_version": "v1",
        "title": "The International Space Station over Earth",
        "url": "https://apod.nasa.gov/apod/image/1604/ISS02_NASA_960.jpg"
    },
    {
        "copyright": "Paulo Raymundo",
        "date": "2001-03-23",
        "explanation": "Streaking low across the western horizon after sunset, the Russian Mir space station makes a final pass through the evening sky above the coastal city of Salvador, Brazil. In this 5 minute 20 second time exposure made with ASA 800 film and a wide-angle lens on March 19, setting stars leave short, almost vertical trails. A rapidly moving Mir travels horizontally, trailing toward the left (south) edge of the picture. Reflecting sunlight from low Earth orbit, the historic space station chanced to produce a \"farewell\" flare near the end of its visible track. As if in poignant response, the Hubble Space Telescope appeared in Brazilian skies within a minute after Mir's passage and also left a flare along a trail moving toward the top of the picture. Lights visible on the horizon are from nearby Itaparica Island. After 15 years in service, the long-lived Mir space station was safely deorbited today. The splashdown of its surviving pieces occurred in a remote area of the South Pacific Ocean.",
        "hdurl": "https://apod.nasa.gov/apod/image/0103/hubblemir_praymundo.jpg",
        "media_type": "image",
        "service_version": "v1",
        "title": "Mir Flares Farewell",
        "url": "https://apod.nasa.gov/apod/image/0103/hubblemir3_praymundo.jpg"
    },
    {
        "copyright": "Deep Sky West",
        "date": "2016-08-04",
        "explanation": "The Sunflower Galaxy blooms near the center of this wide field telescopic view. The scene spans about 2 degrees or 4 full moons on the sky toward the loyal constellation Canes Venatici. More formally known as Messier 63, the majestic island universe is nearly 100,000 light-years across, about the size of our own Milky Way Galaxy. Surrounding its bright yellowish core, sweeping spiral arms are streaked with cosmic dust lanes and dotted with star forming regions. A dominant member of a known galaxy group, M63 has faint, extended features that could be the the remains of dwarf satellite galaxies, evidence that large galaxies grow by accreting small ones. M63 shines across the electromagnetic spectrum and is thought to have undergone bursts of intense star formation.",
        "hdurl": "https://apod.nasa.gov/apod/image/1608/M63LRGBVermetteR.jpg",
        "media_type": "image",
        "service_version": "v1",
        "title": "M63: Sunflower Galaxy Wide Field",
        "url": "https://apod.nasa.gov/apod/image/1608/M63LRGBVermetteR1024.jpg"
    },
    {
        "date": "2003-07-30",
        "explanation": "What causes the unusual white color on some Martian mountains?  The answer can be guessed by noticing that the bright areas disappear as springtime takes hold in the south of Mars: dry ice.  Dry carbon dioxide ice sublimates directly to gas from its frozen state.  The frosty mountains, named Charitum Montes, have been covered with carbon dioxide ice over the Martian winter.  The serene scene pictured above is not a photograph, but rather a computationally constructed digital illusion resulting from the fusion of two color images from the Mars Orbital Camera and topographic data from the Mars Orbiter Laser Altimeter.  Both instruments operate from the Mars Global Surveyor robot spacecraft currently orbiting Mars.  The red planet continues to grow larger in terrestrial skies as Earth and Mars move closer to their recent-record closest approach on August 27.",
        "hdurl": "https://apod.nasa.gov/apod/image/0307/frostymnts_mgs_big.jpg",
        "media_type": "image",
        "service_version": "v1",
        "title": "Frosty Mountains on Mars",
        "url": "https://apod.nasa.gov/apod/image/0307/frostymnts_mgs.jpg"
    },
    {
        "date": "1996-10-14",
        "explanation": "These two clusters of bright, newly formed stars surrounded by a glowing nebula lie 10 million light years away in the dim, irregular galaxy cataloged as NGC 2366. The Hubble Space Telescope image shows that the youngest cluster, the bottom one at about 2 million years old, is still surrounded by the gas and dust cloud it condensed from, while powerful stellar winds from the stars in the older cluster at the top (4-5 million years old), have begun to clear away its central areas giving the entire nebula an apparent hook shape. Compared to the sun, the stars in these clusters are massive and short lived. The brightest one, near the tip of the hook, is a rare Luminous Blue Variable with 30 to 60 times the mass of the sun - similar to the erruptive Eta Carina variable in our own Milky Way. Stars this massive are extremely variable. A comparison with ground based images indicates that in three years this star's brightness increased by about 40 times making it currently the brightest star in this dim galaxy. Studies of such distant and diverse galaxies yield clues to the relationships of star formation and galactic evolution.",
        "hdurl": "https://apod.nasa.gov/apod/image/ngc2366_hst_big.gif",
        "media_type": "image",
        "service_version": "v1",
        "title": "Bright Stars, Dim Galaxy",
        "url": "https://apod.nasa.gov/apod/image/ngc2366_hst.gif"
    },
    {
        "date": "2013-10-27",
        "explanation": "Arcing toward a fiery fate, this Sungrazer comet was recorded by the SOHO spacecraft's Large Angle Spectrometric COronagraph(LASCO) on December 23, 1996. LASCO uses an occulting disk, partially visible at the lower right, to block out the otherwise overwhelming solar disk allowing it to image the inner 8 million kilometers of the relatively faint corona. The comet is seen as its coma enters the bright equatorial solar wind region (oriented vertically). Positioned in space to continuously observe the Sun, SOHO has now been used to discover over 1,500 comets, including numerous sungrazers. Based on their orbits, the vast majority of sungrazers are believed to belong to the Kreutz family of sungrazing comets created by successive break ups from a single large parent comet that passed very near the Sun in the twelfth century. The Great Comet of 1965, Ikeya-Seki, was also a member of the Kreutz family, coming within about 650,000 kilometers of the Sun's surface. Passing so close to the Sun, Sungrazers are subjected to destructive tidal forces along with intense solar heat. This small comet, known as the Christmas Comet SOHO 6, did not survive. Later this year, Comet ISON, potentially the brightest sungrazer in recorded history but not a Kreutz sungrazer, is expected to survive.",
        "hdurl": "https://apod.nasa.gov/apod/image/1310/sungrazer_soho_1024.gif",
        "media_type": "image",
        "service_version": "v1",
        "title": "Sungrazer",
        "url": "https://apod.nasa.gov/apod/image/1310/sungrazer_soho_960.jpg"
    },
    {
        "copyright": "Wally Pacholka",
        "date": "2009-02-19",
        "explanation": "Aloha and welcome to a breathtaking skyscape. The dreamlike panoramic view looks out from the 4,200 meter volcanic summit of Mauna Kea, Hawai'i, across a layer of clouds toward a starry night sky and the rising Milky Way. Anchoring the scene on the far left is the dome of the Canada-France-Hawaii Telescope (CFHT), with north star Polaris shining beyond the dome to the right. Farther right, headed by bright star Deneb, the Northern Cross asterism is embedded along the plane of the Milky Way as it peeks above the horizon. Both Northern Cross and brilliant white Vega hang over a foreground grouping of cinder cones. Near the center are the reddish nebulae, stars and dust clouds of the central Milky Way. Below, illumination from the city lights of Hilo creates an eerie, greenish glow in the clouds. Red supergiant star Antares shines above the Milky Way's central bulge while bright Alpha Centauri lies still farther right, along the dusty galactic plane. Finally, at the far right is the large Gemini North Observatory. The compact group of stars known as the Southern Cross is just left of the telescope dome. Need some help identifying the stars?  Just slide your cursor over the picture, or download this smaller, labeled panorama.   digg_url = 'http://apod.nasa.gov/apod/ap090219.html'; digg_skin = 'compact';",
        "hdurl": "https://apod.nasa.gov/apod/image/0902/MKMilkyWaypan_pacholka_600WPAP.jpg",
        "media_type": "image",
        "service_version": "v1",
        "title": "Mauna Kea Milky Way Panorama",
        "url": "https://apod.nasa.gov/apod/image/0902/MKMilkyWaypan_pacholka_600WPAP.jpg"
    },
    {
        "date": "2016-07-08",
        "explanation": "At the core of the Crab Nebula lies a city-sized, magnetized neutron star spinning 30 times a second. Known as the Crab Pulsar, it's actually the rightmost of two bright stars, just below a central swirl in this stunning Hubble snapshot of the nebula's core. Some three light-years across, the spectacular picture frames the glowing gas, cavities and swirling filaments bathed in an eerie blue light. The blue glow is visible radiation given off by electrons spiraling in a strong magnetic field at nearly the speed of light. Like a cosmic dynamo the pulsar powers the emission from the nebula, driving a shock wave through surrounding material and accelerating the spiraling electrons. With more mass than the Sun and the density of an atomic nucleus, the spinning pulsar is the collapsed core of a massive star that exploded. The Crab Nebula is the expanding remnant of the star's outer layers. The supernova explosion was witnessed on planet Earth in the year 1054.",
        "hdurl": "https://apod.nasa.gov/apod/image/1607/hstheritage_crabcore.jpg",
        "media_type": "image",
        "service_version": "v1",
        "title": "The Swirling Core of the Crab Nebula",
        "url": "https://apod.nasa.gov/apod/image/1607/hstheritage_crabcore1024.jpg"
    },
    {
        "date": "1995-07-19",
        "explanation": "July 19, 1995    The Mountains of Mars  Picture Credit: NASA,Viking Project  Explanation:  Volcanic activity on Mars has produced towering mountains. The largest one, Olympus Mons, is pictured here in this Viking Orbiter image. Olympus Mons is a shield volcano nearly 15 miles high and over 300 miles wide at its base. By comparison, Earth's largest volcano, Mauna Loa in Hawaii, is just over 5 miles high and about 12 miles wide.  For more information about volcanic mountains on Mars see Calvin J. Hamilton's Mars page. The exploration of Mars is chronicled by the Center For Mars Exploration.  We keep an archive of Astronomy Pictures of the Day.   Astronomy Picture of the Day is brought to you by  Robert Nemiroff and  Jerry Bonnell . Original material on this page is copyrighted to Robert J. Nemiroff and Jerry T. Bonnell.",
        "hdurl": "https://apod.nasa.gov/apod/image/olympus.gif",
        "media_type": "image",
        "service_version": "v1",
        "title": "The Mountains of Mars",
        "url": "https://apod.nasa.gov/apod/image/olympus.gif"
    },
    {
        "date": "1997-07-29",
        "explanation": "The rocks on Mars tell us stories about their past. To decipher these stories, a scientist must become a detective, searching for clues and fitting them with theories. The above photograph of the rocky Martian surface to the northeast of Pathfinder's landing site provides many such clues.  For example, at least three types of rocks are evident, marked with red, white and blue arrows. The red arrows point to smooth rocks, which Pathfinder scientists hypothesize have been eroded by tumbling through ancient channels of water which evaporated long ago.  The blue arrows indicate a different type of rock, ragged ones with sharp edges, hypothesized to have been ejected when nearby craters formed or volcanoes erupted. The white areas are more mysterious, and might be some sort of composite material.  Sojourner was recently diverted to study these white areas to gather more clues so continued detective work can yield better insight into the Martian past.",
        "hdurl": "https://apod.nasa.gov/apod/image/9707/mars11_pf_big.jpg",
        "media_type": "image",
        "service_version": "v1",
        "title": "Strange Rocks on Mars",
        "url": "https://apod.nasa.gov/apod/image/9707/mars11_pf.jpg"
    },
    {
        "copyright": "Marco Fulle",
        "date": "2009-07-13",
        "explanation": "A volcano on Krakatoa is still erupting. Perhaps most famous for the powerfully explosive eruption in 1883 that killed tens of thousands of people, ash from a violent eruption might also have temporarily altered Earth's climate as long as 1500 years ago. In 1927, eruptions caused smaller Anak Krakatau to rise from the sea, and the emerging volcanic island continues to grow at an average rate of 2 cm per day.  The latest eruption of Anak Krakatau started in 2008 April and continues today.  In this picture, Anak Krakatau is seen erupting from Rakata, the main island of the Krakatoai group.  High above, stars including the Big Dipper are clearly apparent.   digg_url = 'http://apod.nasa.gov/apod/ap090713.html'; digg_skin = 'compact';",
        "hdurl": "https://apod.nasa.gov/apod/image/0907/krakatau_fulle_big.jpg",
        "media_type": "image",
        "service_version": "v1",
        "title": "Erupting Volcano Anak Krakatau",
        "url": "https://apod.nasa.gov/apod/image/0907/krakatau_fulle.jpg"
    },
    {
        "date": "2003-12-24",
        "explanation": "Why are some hills on Mars so layered?  The answer is still under investigation.  Clearly, dark windblown sand surrounds outcropping of light sedimentary rock across the floor of crater Arabia Terra.  The light rock clearly appears structured into many layers, the lowest of which is likely very old.  Although the dark sand forms dunes, rippled dunes of lighter colored sand are easier to see surrounding the stepped mesas.  Blown sand possibly itself eroded once-larger mesas into the layered hills.  Most of the layered shelves are wide enough to drive a truck around.  The above image, showing an area about 3 kilometers across, was taken in October by the Mars Global Surveyor spacecraft currently orbiting Mars.  Tomorrow, the first of three robot spacecraft from Earth is scheduled to arrive at the red planet.",
        "hdurl": "https://apod.nasa.gov/apod/image/0312/marshills_mgs_big.gif",
        "media_type": "image",
        "service_version": "v1",
        "title": "Layered Hills on Mars",
        "url": "https://apod.nasa.gov/apod/image/0312/marshills_mgs.jpg"
    },
    {
        "copyright": "Robert GendlerRoberto Colombari\n Image Data: \nHubble Space\nTelescope,\nEuropean Southern Observatory\n",
        "date": "2015-11-19",
        "explanation": "What's the closest active galaxy to planet Earth? That would be Centaurus A, only 11 million light-years distant. Spanning over 60,000 light-years, the peculiar elliptical galaxy is also known as NGC 5128. Forged in a collision of two otherwise normal galaxies, Centaurus A's fantastic jumble of young blue star clusters, pinkish star forming regions, and imposing dark dust lanes are seen here in remarkable detail. The colorful galaxy portrait is a composite of image data from space- and ground-based telescopes large and small. Near the galaxy's center, left over cosmic debris is steadily being consumed by a central black hole with a billion times the mass of the Sun. As in other active galaxies, that process generates the radio, X-ray, and gamma-ray energy radiated by Centaurus A.",
        "hdurl": "https://apod.nasa.gov/apod/image/1511/Centaurus-HST-ESO-LL.jpg",
        "media_type": "image",
        "service_version": "v1",
        "title": "Centaurus A",
        "url": "https://apod.nasa.gov/apod/image/1511/Centaurus-HST-ESO-S1024.jpg"
    },
    {
        "date": "2005-06-29",
        "explanation": "The Deep Impact spacecraft continues to close on Comet Tempel 1, a comet roughly the size of Manhattan.  Early on July 3 (EDT), the Deep Impact spacecraft will separate in to two individual robotic spaceships, one called Flyby and the other called Impactor.  During the next 24 hours, both Flyby and Impactor will fire rockets and undergo complex maneuvers in preparation for Impactor's planned collision with Comet Tempel 1.  On July 4 (1:52 am EDT) if everything goes as scheduled, the 370-kilogram Impactor will strike Tempel 1's surface at over 14,000 kilometers per hour.  Impactor will attempt to photograph the oncoming comet right up to the time of collision, while Flyby photographs the result from nearby.  The above image was taken on 19 June from about 13 million kilometers out and used to help identify the central nucleus of the comet inside the diffuse coma.  Telescopes around the Earth, including the Hubble Space Telescope, will also be closely watching the distant silent space ballet.  The result may give crucial information about the structure of comets and the early history of our Solar System.",
        "hdurl": "https://apod.nasa.gov/apod/image/0506/tempel1_deepimpact_big.jpg",
        "media_type": "image",
        "service_version": "v1",
        "title": "Thirteen Million Kilometers from Comet Tempel 1",
        "url": "https://apod.nasa.gov/apod/image/0506/tempel1_deepimpact.jpg"
    },
    {
        "copyright": "Osservatorio MTM",
        "date": "2016-12-25",
        "explanation": "Sculpted by stellar winds and radiation, a magnificent interstellar dust cloud by chance has assumed this recognizable shape.  Fittingly named the Horsehead Nebula, it is some 1,500 light-years distant, embedded in the vast Orion cloud complex. About five light-years \"tall\", the dark cloud is cataloged as Barnard 33 and is visible only because its obscuring dust is silhouetted against the glowing red emission nebula IC 434.  Stars are forming within the dark cloud. Contrasting blue reflection nebula NGC 2023, surrounding a hot, young star, is at the lower left.  The gorgeous color image combines both narrowband and broadband images recorded using three different telescopes.    Free Present: APOD 2017 Calendar: NASA Images",
        "hdurl": "https://apod.nasa.gov/apod/image/1612/ic434_mtm_1600.jpg",
        "media_type": "image",
        "service_version": "v1",
        "title": "The Magnificent Horsehead Nebula",
        "url": "https://apod.nasa.gov/apod/image/1612/ic434_mtm_960.jpg"
    },
    {
        "copyright": "European Southern Observatory",
        "date": "1999-03-10",
        "explanation": "Add another 8-meter telescope to the list of modern optical telescope giants.  Kueyen achieved a first-light photograph of a bright star on March 1, ahead of schedule. The above picture of spiral galaxy NGC 2997 was taken with Antu, the first of the four planned Very Large Telscopes (VLTs) being built in Chile for the European Southern Observatory.  NGC 2997 is a thin spiral galaxy tilted about 45 degrees with a bright compact nucleus and prominent lanes of dark dust.",
        "hdurl": "https://apod.nasa.gov/apod/image/9903/ngc2997_vlt_big.jpg",
        "media_type": "image",
        "service_version": "v1",
        "title": "NGC 2997 from VLT",
        "url": "https://apod.nasa.gov/apod/image/9903/ngc2997_vlt.jpg"
    },
    {
        "copyright": "Michael Abramyan",
        "date": "2021-10-25",
        "explanation": "Does the road to our galaxy's center go through Monument Valley? It doesn't have to, but if your road does -- take a picture. In this case, the road is US Route 163 and iconic buttes on the Navajo National Reservation populate the horizon.  The band of Milky Way Galaxy stretches down from the sky and appears to be a continuation of the road on Earth. Filaments of dust darken the Milky Way, in contrast to billions of bright stars and several colorful glowing gas clouds including the Lagoon and Trifid nebulas. The featured picture is a composite of images taken with the same camera and from the same location -- Forest Gump Point in Utah, USA. The foreground was taken just after sunset in early September during the blue hour, while the background is a mosaic of four exposures captured a few hours later.    Discovery + Outreach: Graduate student research position open for APOD",
        "hdurl": "https://apod.nasa.gov/apod/image/2110/MonumentValleyRoad_Abramyan_2048.jpg",
        "media_type": "image",
        "service_version": "v1",
        "title": "Road to the Galactic Center",
        "url": "https://apod.nasa.gov/apod/image/2110/MonumentValleyRoad_Abramyan_960.jpg"
    },
    {
        "copyright": "Wade B. Clark Jr.",
        "date": "2002-08-15",
        "explanation": "Skygazers report that the annual Perseid meteor shower went pretty much as predicted, producing a meteor every few minutes during the dark early morning hours of August 12 and 13. And as the constellation Perseus rose above the horizon on the night of August 11, astrophotographer Wade Clark was anticipating recording images of the flashing meteor trails from the Mt. Baker Ski Area in northwest Washington, USA. But Clark was also treated to a colorful display of northern lights. As a result, the stars of Perseus are arrayed near the center of his well composed skyscape along with trails of Perseid meteors all viewed through the auroral glow. The alluring scene might look familiar to watchers of bygone Perseids. For many, views of the meteor shower in 2000 also coincided with auroral displays, courtesy of the active Sun.",
        "hdurl": "https://apod.nasa.gov/apod/image/0208/aurperseids_clark_full.jpg",
        "media_type": "image",
        "service_version": "v1",
        "title": "Meteors and Northern Lights",
        "url": "https://apod.nasa.gov/apod/image/0208/aurperseids_clark.jpg"
    },
    {
        "date": "2011-04-15",
        "explanation": "Big, beautiful spiral galaxy M101 is one of the last entries in Charles Messier's famous catalog, but definitely not one of the least. About 170,000 light-years across, this galaxy is enormous, almost twice the size of our own Milky Way galaxy. M101 was also one of the original spiral nebulae observed by Lord Rosse's large 19th century telescope, the Leviathan of Parsontown. This mosaic of M101 was assembled from Hubble Legacy Archive data. Additional ground-based data was included to further define the telltale reddish emission from atomic hydrogen gas in this gorgeous galaxy's star forming regions. The sharp image shows stunning features in the galaxy's face-on disk of stars and dust along with background galaxies, some visible right through M101 itself. Also known as the Pinwheel Galaxy, M101 lies within the boundaries of the northern constellation Ursa Major, about 25 million light-years away.",
        "hdurl": "https://apod.nasa.gov/apod/image/1104/M101HST-GendlerM.jpg",
        "media_type": "image",
        "service_version": "v1",
        "title": "Messier 101",
        "url": "https://apod.nasa.gov/apod/image/1104/M101HST-Gendler900.jpg"
    }
]

db.on('open', () => {
    // delete all the existing APODS
    Apod.deleteMany({})
        .then(deletedApods => {
            console.log('this is what .remove returns', deletedApods)


            Apod.create(startApods)
            .then(data => {
                console.log('here are the newly pulled Apods', data)
                // always close connection to the db
                db.close()
            })
            .catch(error => {
                console.log(error)
                // always close connection to the db
                db.close()
            })

        })
        .catch(error => {
            console.log(error)
            // always close connection to the db
            db.close()
        })
})
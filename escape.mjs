import fetch from 'node-fetch';

const SPACE_API = "https://api.le-systeme-solaire.net/rest/";
const playerId = "jasminemk@uia.no";
const GAME_API = "https://spacescavanger.onrender.com";

// Start 
await (async function start() {
    const response = await fetch(`${GAME_API}/start?player=${playerId}`);
    const body = await response.json();
    console.log(body);
    })();

// Difference between equatorial and mean radius of the sun

async function getSunRadiusDifference() {
    const response = await fetch(SPACE_API);
    const data = await response.json();

    const earthResponse = await fetch(`${SPACE_API}bodies/terre`);
    const earthData = await earthResponse.json();
    console.log("Earth data:", earthData);

    const sunResponse = await fetch(`${SPACE_API}bodies/soleil`);
    const sunData = await sunResponse.json();
    console.log("Sun data:", sunData);

    const diffRadius = sunData.equaRadius - sunData.meanRadius;
    console.log("Difference in radius:", diffRadius);

    const answerResponse = await fetch(`${GAME_API}/answer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            answer: diffRadius,
            player: playerId
        })
    });
    
    const answerBody = await answerResponse.json();
    console.log(answerBody);
}

await getSunRadiusDifference();

// Planet closest to Earth's axial tilt

async function getClosestPlanetToAxialTilt() {

    const earthResponse = await fetch(`${SPACE_API}bodies/terre`);
    const earthData = await earthResponse.json();
    const earthAxialTilt = earthData.axialTilt;
    console.log("Earth axial tilt:", earthAxialTilt);

    const bodiesResponse = await fetch(`${SPACE_API}bodies`);
    const bodiesData = await bodiesResponse.json();
    const planets = bodiesData.bodies.filter(body => body.isPlanet === true && body.englishName !== 'Earth');
    console.log("Planets data:", planets);

    let closestPlanet = null;
    let closestTiltDifference = Infinity;

    for (const planet of planets) {
        if (planet.axialTilt !== undefined) {
            const planetAxialTilt = planet.axialTilt;
            const tiltDifference = Math.abs(earthAxialTilt - planetAxialTilt);

            if (tiltDifference < closestTiltDifference) {
                closestTiltDifference = tiltDifference;
                closestPlanet = planet.englishName;
            }
        }
    }

    console.log("Closest planet to Earth's axial tilt is:", closestPlanet);

    const answerResponse = await fetch(`${GAME_API}/answer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            answer: closestPlanet,
            player: playerId
        })
    });

    const answerBody = await answerResponse.json();
    console.log(answerBody);
}

await getClosestPlanetToAxialTilt();

// Planet with shortest day

async function getPlanetWithShortestDay() {
    const bodiesResponse = await fetch(`${SPACE_API}bodies?isPlanet=true`);
    const bodiesData = await bodiesResponse.json();

    const planets = bodiesData.bodies.filter(body => body.isPlanet === true);
    console.log("Planets data:", planets);

    let shortestDayPlanet = null;
    let shortestDay = Infinity;

    for (const planet of planets) {
        if (planet.sideralRotation !== undefined) {
            const planetDay = Math.abs(planet.sideralRotation); 
            console.log(`${planet.englishName}: ${planetDay} hours`);

            if (planetDay < shortestDay) {
                shortestDay = planetDay;
                shortestDayPlanet = planet.englishName;
            }
        }
    }
    console.log("Planet with shortest day is:", shortestDayPlanet);


const answerResponse = await fetch(`${GAME_API}/answer`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        answer: shortestDayPlanet,
        player: playerId
    })
});

const answerBody = await answerResponse.json();
console.log(answerBody);
}

await getPlanetWithShortestDay();


// Jupiter Moons

async function getJupiterMoons() {
    const bodiesResponse = await fetch(`${SPACE_API}bodies/jupiter`);
    const bodiesData = await bodiesResponse.json();

    const jupiterMoons = bodiesData.moons;
    const numberOfMoons = jupiterMoons.length;

    console.log("Number of moons around Jupiter:", numberOfMoons);

    const answerResponse = await fetch(`${GAME_API}/answer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            answer: numberOfMoons,
            player: playerId
        })
    });

    const answerBody = await answerResponse.json();
    console.log(answerBody);
}

await getJupiterMoons();

// Jupiter's largest moon

async function getLargestJupiterMoon() {
    const bodiesResponse = await fetch(`${SPACE_API}bodies/jupiter`);
    const bodiesData = await bodiesResponse.json();

    const jupiterMoons = bodiesData.moons;
    let largestMoon = null;
    let largestMoonDiameter = 0;

    for (const moon of jupiterMoons) {
        const moonResponse = await fetch(moon.rel);
        const moonData = await moonResponse.json();
        const diameter = moonData.meanRadius * 2;

        if (diameter > largestMoonDiameter) {
            largestMoonDiameter = diameter;
            largestMoon = moonData.englishName;
        }
    }

    console.log("Largest moon of Jupiter:", largestMoon);

    const answerResponse = await fetch(`${GAME_API}/answer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            answer: largestMoon,
            player: playerId
        })
    });

    const answerBody = await answerResponse.json();
    console.log(answerBody);
}

await getLargestJupiterMoon();

// Pluto is a planet!!

async function getPlutoClassification() {
    const plutoResponse = await fetch(`${SPACE_API}bodies/pluto`);
    const plutoData = await plutoResponse.json();
    const classification = plutoData.classification || "dwarf planet";

    console.log("Pluto's classification:", classification);


    const answerResponse = await fetch(`${GAME_API}/answer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            answer: classification,
            player: playerId
        })
    });

    const answerBody = await answerResponse.json();
    console.log(answerBody);
}

await getPlutoClassification();
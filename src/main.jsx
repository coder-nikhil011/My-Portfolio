import React, { useEffect, useRef, useState, useCallback } from "react";
import { createRoot } from "react-dom/client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";
import * as THREE from "three";
import "./index.css";

gsap.registerPlugin(ScrollTrigger);

const Arrow = () => <span className="arrow">↗</span>;

const projects = [
  {
    no: "01",
    title: "PulseOS",
    url: "https://pulseos-app.netlify.app/",
    type: "DESKTOP DIAGNOSTICS & OPTIMIZATION",
    tech: "JAVA · MAVEN",
    description:
      "Developing a desktop diagnostics and system-management application focused on hardware telemetry, device health, and system monitoring. Includes a storage-analysis direction to help users understand large files, unnecessary storage usage, and optimization opportunities.",
  },
  {
    no: "02",
    title: "CampusSyn",
    url: "https://github.com/coder-nikhil011/Campus_Syn",
    type: "CAMPUS MANAGEMENT PLATFORM",
    tech: "MERN STACK",
    description:
      "Role-based campus platform with dedicated dashboards and workflows for Admin, Teacher, Organizer, and Student roles. RESTful APIs built with Node.js and Express.js for assignments, reminders, events, and student records, secured with JWT authentication and role-based access control.",
  },
  {
    no: "03",
    title: "MILO",
    url: "https://github.com/coder-nikhil011/MILO",
    type: "LOST & FOUND PLATFORM",
    tech: "REACT.JS · FIREBASE",
    description:
      "Community-based application enabling users to report, browse, and discover lost or found items, with Firebase authentication, image uploads, real-time database updates, search, filtering, and interactive item listings.",
  },
  {
    no: "04",
    title: "Speakly",
    url: "https://speakly-steel.vercel.app/",
    type: "AI-POWERED LANGUAGE LEARNING",
    tech: "GENERATIVE AI · PYTHON",
    description:
      "Designed a language-learning platform bridging textbook learning and real-world conversation through AI-powered tutoring and speaking practice. Supports personalized learning paths for students and teachers to make language acquisition engaging and data-driven.",
  },
  {
    no: "05",
    title: "CodeBridge",
    url: "https://github.com/coder-nikhil011/CodeBridge",
    type: "DSA BROWSER EXTENSION",
    tech: "JAVASCRIPT · GEMINI API",
    description:
      "AI-assisted browser extension providing hints, explanations, and step-by-step guidance for DSA problems. Integrated with the Gemini API for coding platforms such as LeetCode and HackerRank.",
  },
  {
    no: "06",
    title: "ResumeBuilder",
    url: "https://github.com/coder-nikhil011/Building_Resume",
    type: "AI-ASSISTED RESUME BUILDER",
    tech: "HTML · CSS · JAVASCRIPT",
    description:
      "Dynamic resume builder with customizable sections, structured resume generation, and real-time preview. Integrated AI-assisted features to help users generate, refine, and improve professional resume content.",
  },
];

const skills = [
  ["LANGUAGES", "C++ · Java · Python · JavaScript · SQL"],
  ["FRONTEND", "React.js · HTML5 · CSS3 · Tailwind CSS"],
  ["BACKEND", "Node.js · Express.js · Spring Boot · Kafka · Redis · REST APIs"],
  ["DATABASES", "MongoDB · MySQL"],
  ["CORE CS", "Data Structures & Algorithms · OOP · DBMS · Operating Systems · Computer Networks · System Design"],
  ["TOOLS & OTHERS", "Git · GitHub · VS Code · MERN Stack · API Integration"],
];

function Nav({ setMenu }) {
  return (
    <header className="nav">
      <a href="#home" className="brand">
        NK<span>.</span>
      </a>

      <div className="navLinks">
        <a href="#about">ABOUT</a>
        <a href="#skills">SKILLS</a>
        <a href="#experience">EXPERIENCE</a>
        <a href="#coding">CODING</a>
        <a href="#projects">PROJECTS</a>
        <a href="#contact">CONTACT</a>
      </div>

      <button className="menu" onClick={() => setMenu(true)}>
        <i />
        <i />
        <i />
      </button>
    </header>
  );
}


/* =====================================================
   REAL DRONE — natural flight, tied to section transitions
===================================================== */

function Drone({ heroRef, aboutRef, skillsRef, experienceRef, codingRef, projectRef, educationRef, contactRef }) {
  const flightState = useRef({
    x: 1.55,
    y: 0.2,
    z: 0.5,
    rotX: 0,
    rotY: 0,
    rotZ: 0,
    scale: 0.68,
    motorPower: 0,    // 0 = off, 1 = full spin
    scrollVelocity: 0,
    hasScrolled: false, // becomes true when first section trigger fires
    isLanding: false,
  });

  useEffect(() => {
    const target = flightState.current;

    const ctx = gsap.context(() => {
      // Dynamic traversal across sections: Right -> Center-Right (look at photo) -> Left -> Right -> Left -> Right -> Left -> Center-Right landing
      const keyframes = [
        {
          trigger: aboutRef.current,
          start: () => `top bottom+=${window.innerHeight * 0.73}px`,
          end: "center center",
          from: { x: 1.55,  y: 0.2,  z: 0.5,  rotX: 0,     rotY: 0,     rotZ: 0,     scale: 0.68, motorPower: 0 },
          to:   { x: 0.75,  y: 0.05, z: 0.65, rotX: 0.04,  rotY: -1.35, rotZ: 0.08,  scale: 0.95, motorPower: 1 },
        },
        {
          trigger: skillsRef.current,
          start: "top bottom",
          end: "center center",
          from: { x: 0.75,  y: 0.05, z: 0.65, rotX: 0.04,  rotY: -1.35, rotZ: 0.08,  scale: 0.95, motorPower: 1 },
          to:   { x: -1.2,  y: -0.1, z: 0.45, rotX: 0.05,  rotY: 0.55,  rotZ: -0.15, scale: 0.85, motorPower: 1 },
        },
        {
          trigger: experienceRef.current,
          start: "top bottom",
          end: "center center",
          from: { x: -1.2,  y: -0.1, z: 0.45, rotX: 0.05,  rotY: 0.55,  rotZ: -0.15, scale: 0.85, motorPower: 1 },
          to:   { x: 1.18,  y: 0.15, z: 0.55, rotX: -0.04, rotY: -0.45, rotZ: 0.14,  scale: 0.82, motorPower: 1 },
        },
        {
          trigger: codingRef.current,
          start: "top bottom",
          end: "center center",
          from: { x: 1.18,  y: 0.15, z: 0.55, rotX: -0.04, rotY: -0.45, rotZ: 0.14,  scale: 0.82, motorPower: 1 },
          to:   { x: -1.05, y: -0.05,z: 0.5,  rotX: 0.04,  rotY: 0.4,   rotZ: -0.1,  scale: 0.82, motorPower: 1 },
        },
        {
          trigger: projectRef.current,
          start: "top bottom",
          end: "center center",
          from: { x: -1.05, y: -0.05,z: 0.5,  rotX: 0.04,  rotY: 0.4,   rotZ: -0.1,  scale: 0.82, motorPower: 1 },
          to:   { x: 1.2,   y: 0.0,  z: 0.5,  rotX: -0.04, rotY: -0.45, rotZ: 0.12,  scale: 0.8,  motorPower: 1 },
        },
        {
          trigger: educationRef.current,
          start: "top bottom",
          end: "center center",
          from: { x: 1.2,   y: 0.0,  z: 0.5,  rotX: -0.04, rotY: -0.45, rotZ: 0.12,  scale: 0.8,  motorPower: 1 },
          to:   { x: -1.15, y: 0.1,  z: 0.45, rotX: 0.05,  rotY: 0.45,  rotZ: -0.12, scale: 0.78, motorPower: 1 },
        },
        {
          // Contact: drone flies right and powers off completely
          trigger: contactRef.current,
          start: "top bottom",
          end: "bottom bottom",
          from: { x: -1.15, y: 0.1,  z: 0.45, rotX: 0.05, rotY: 0.45,  rotZ: -0.12, scale: 0.78, motorPower: 1 },
          to:   { x: 0,     y: -0.55,z: 0.5,  rotX: 0,    rotY: 0,     rotZ: 0,     scale: 0.72, motorPower: 0 },
        },
      ];

      keyframes.forEach((kf) => {
        if (!kf.trigger) return;
        ScrollTrigger.create({
          trigger: kf.trigger,
          start: kf.start,
          end: kf.end,
          scrub: 0.6,
          onUpdate: (self) => {
            if (window.scrollY <= 0) {
              Object.assign(target, {
                x: 1.55,
                y: 0.2,
                z: 0.5,
                rotX: 0,
                rotY: 0,
                rotZ: 0,
                scale: 0.68,
                motorPower: 0,
                scrollVelocity: 0,
                hasScrolled: false,
                isLanding: false,
              });
              return;
            }

            const p = gsap.utils.interpolate;
            const e = gsap.parseEase("power2.inOut")(self.progress);
            target.x          = p(kf.from.x,          kf.to.x,          e);
            target.y          = p(kf.from.y,          kf.to.y,          e);
            target.z          = p(kf.from.z,          kf.to.z,          e);
            target.rotX       = p(kf.from.rotX,       kf.to.rotX,       e);
            target.rotY       = p(kf.from.rotY,       kf.to.rotY,       e);
            target.rotZ       = p(kf.from.rotZ,       kf.to.rotZ,       e);
            target.scale      = p(kf.from.scale,      kf.to.scale,      e);
            target.motorPower =
              kf.trigger === contactRef.current && self.direction < 0
                ? 1
                : p(kf.from.motorPower, kf.to.motorPower, e);
            target.scrollVelocity = Math.abs(self.getVelocity());
            target.isLanding = kf.trigger === contactRef.current;
            if (!target.hasScrolled) target.hasScrolled = true;
          },
        });
      });

    });

    return () => ctx.revert();
  }, [heroRef, aboutRef, skillsRef, experienceRef, codingRef, projectRef, educationRef, contactRef]);

  return (
    <div style={{ position: "fixed", inset: 0, width: "100vw", height: "100vh", pointerEvents: "none", zIndex: 30 }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 36 }}
        gl={{ antialias: true, alpha: true }}
        style={{ pointerEvents: "none" }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 8, 5]} intensity={2.5} color="#ffffff" />
        <directionalLight position={[-5, 3, -5]} intensity={1.6} color="#e52a20" />
        <directionalLight position={[0, -5, 3]} intensity={0.7} color="#ffffff" />
        <Environment preset="studio" />
        <DroneModel flightState={flightState} />
      </Canvas>
    </div>
  );
}

function DroneModel({ flightState }) {
  const { scene } = useGLTF("/drone_separated.glb");
  const { size } = useThree();
  const viewportScale = Math.min(1, Math.max(0.36, size.width / 1000));
  const mainGroup = useRef(null);
  const gimbalNode = useRef(null);
  const lensNode = useRef(null);
  const bladeRefs = useRef([]);
  const prevPos = useRef({ x: 1.55, y: 0.2 });
  const mousePos = useRef({ x: 0, y: 0 });
  const smoothedMouse = useRef({ x: 0, y: 0 });
  const bladeSpin = useRef(0);
  const reducedMotion = useRef(false);

  useEffect(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => {
      reducedMotion.current = motionPreference.matches;
    };
    updateMotionPreference();
    motionPreference.addEventListener("change", updateMotionPreference);

    // Enable DoubleSide and reflections across all meshes
    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        child.material.side = THREE.DoubleSide;
        child.material.metalness = 0.85;
        child.material.roughness = 0.2;
        child.material.envMapIntensity = 2.0;
      }
    });

    // Re-center 4 REAL propeller wing meshes to spin cleanly on their motor hub pivots
    bladeRefs.current = ["blade_0", "blade_1", "blade_2", "blade_3"]
      .map((name) => scene.getObjectByName(name))
      .filter(Boolean);

    bladeRefs.current.forEach((blade) => {
      if (blade && blade.geometry) {
        blade.geometry.computeBoundingBox();
        const center = blade.geometry.boundingBox.getCenter(new THREE.Vector3());
        blade.geometry.translate(-center.x, -center.y, -center.z);
        blade.position.add(center);
      }
    });

    // Re-center REAL camera_gimbal & camera_lens meshes so they rotate flush with drone_body
    gimbalNode.current = scene.getObjectByName("camera_gimbal");
    lensNode.current = scene.getObjectByName("camera_lens");

    [gimbalNode.current, lensNode.current].forEach((node) => {
      if (node && node.geometry) {
        node.geometry.computeBoundingBox();
        const center = node.geometry.boundingBox.getCenter(new THREE.Vector3());
        node.geometry.translate(-center.x, -center.y, -center.z);
        node.position.add(center);
      }
    });

    const onMove = (e) => {
      mousePos.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mousePos.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      motionPreference.removeEventListener("change", updateMotionPreference);
    };
  }, [scene]);

  useFrame((state, delta) => {
    if (!mainGroup.current) return;
    const target = flightState.current;
    const g = mainGroup.current;
    const lerp = THREE.MathUtils.lerp;
    const isIdle = !target.hasScrolled;

    // Movement velocity banking
    const vx = isIdle ? 0 : target.x - prevPos.current.x;
    const vy = isIdle ? 0 : target.y - prevPos.current.y;
    prevPos.current.x = target.x;
    prevPos.current.y = target.y;

    const rollLean = reducedMotion.current ? 0 : -vx * 0.35;
    const pitchLean = reducedMotion.current ? 0 : vy * 0.25;

    // Reduced mouse influence: only camera gimbal follows cursor; drone body stays on path
    const mouseLookX = reducedMotion.current ? 0 : -mousePos.current.y * 0.15;
    const mouseLookY = reducedMotion.current ? 0 : mousePos.current.x * 0.20;
    const motorPower = target.motorPower;

    smoothedMouse.current.x = lerp(smoothedMouse.current.x, mouseLookX * motorPower, delta * 4);
    smoothedMouse.current.y = lerp(smoothedMouse.current.y, mouseLookY * motorPower, delta * 4);

    // Parallax offset disabled for stability
    const parallaxX = 0;
    const parallaxY = 0;

    // Smooth hover sway
    const t = state.clock.elapsedTime;
    const ySway = reducedMotion.current ? 0 : Math.sin(t * 1.5) * 0.02 * motorPower;
    const xSway = reducedMotion.current ? 0 : Math.cos(t * 1.1) * 0.015 * motorPower;

    const positionLerp = reducedMotion.current ? 12 : 4.5;
    const landingOffset = target.isLanding
      ? (size.width <= 550 ? -0.7 : size.width > 550 ? -0.48 : 0)
      : 0;
    g.position.x = lerp(g.position.x, target.x * viewportScale + parallaxX + xSway * viewportScale, delta * positionLerp);
    g.position.y = lerp(g.position.y, target.y + landingOffset + parallaxY + ySway, delta * positionLerp);
    g.position.z = lerp(g.position.z, target.z, delta * positionLerp);

    const landingScale = target.isLanding && size.width > 550 ? 0.82 : 1;
    const modelScale = target.scale * viewportScale * landingScale;
    g.scale.x = lerp(g.scale.x, modelScale, delta * positionLerp);
    g.scale.y = lerp(g.scale.y, modelScale, delta * positionLerp);
    g.scale.z = lerp(g.scale.z, modelScale, delta * positionLerp);

        // Apply pitch, yaw, and banking to main drone body (now independent of mouse)
    g.rotation.x = lerp(g.rotation.x, target.rotX + pitchLean, delta * 5);
    g.rotation.y = lerp(g.rotation.y, target.rotY, delta * 5);
    g.rotation.z = lerp(g.rotation.z, target.rotZ + rollLean, delta * 5);

    // Camera gimbal also turns with enhanced precision
    if (gimbalNode.current) {
      gimbalNode.current.rotation.x = smoothedMouse.current.x * 1.2;
      gimbalNode.current.rotation.y = smoothedMouse.current.y * 1.2;
    }
    if (lensNode.current) {
      lensNode.current.rotation.x = smoothedMouse.current.x * 1.2;
      lensNode.current.rotation.y = smoothedMouse.current.y * 1.2;
    }

    // 4 Real propeller blades spin smoothly
    const bladeTargetSpeed = reducedMotion.current
      ? 12 * motorPower
      : (55 + Math.min(target.scrollVelocity * 0.05, 30)) * motorPower;
    bladeSpin.current = lerp(bladeSpin.current, bladeTargetSpeed, delta * 4);
    bladeRefs.current.forEach((blade, i) => {
      if (blade) blade.rotation.y += delta * bladeSpin.current * (i % 2 === 0 ? 1 : -1);
    });
  });

  return (
    <group ref={mainGroup} position={[1.55 * viewportScale, 0.2, 0.5]} scale={0.68 * viewportScale}>
      <primitive object={scene} scale={0.88} />
    </group>
  );
}


/* =====================================================
   ABOUT — Professional Portfolio Portrait
===================================================== */

function About() {
  return (
    <section id="about" className="section about">

      <div className="sectionTop">
        <span>01</span>
        <span>ABOUT</span>
      </div>

      <div className="aboutHeading reveal">
        <h2>
          BUILDING
          <br />
          WITH
          <br />
          <em>PURPOSE.</em>
        </h2>
      </div>

      <div className="aboutSplit">

        <div className="aboutImagePanel reveal">
          <img
            src="/scan-photo.png"
            alt="Nikhil Kumar"
            className="aboutScanImage"
          />
        </div>

        <div className="aboutText reveal">

          <p className="largeText">
            SOFTWARE ENGINEER
            / FULL STACK DEVELOPER
          </p>

          <p>
            I build full-stack products, work with data structures
            and algorithms, and explore AI/ML to turn ideas into
            useful digital experiences.
          </p>

          <div className="aboutStats">

            <div>
              <strong>7.3</strong>
              <span>CGPA</span>
            </div>

            <div>
              <strong>2026</strong>
              <span>GRADUATION</span>
            </div>

            <div>
              <strong>18+</strong>
              <span>REPOSITORIES</span>
            </div>

            <div>
              <strong>350+</strong>
              <span>DSA SOLVED</span>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}


/* =====================================================
   SKILLS
===================================================== */

function Skills() {
  return (
    <section id="skills" className="section skills">

      <div className="sectionTop">
        <span>02</span>
        <span>SKILLS</span>
      </div>

      <h2 className="displayTitle reveal">
        TOOLS
        <br />
        I USE.
      </h2>

      <div className="skillList">

        {skills.map(([name, value], index) => (
          <div className="skillRow reveal" key={name}>

            <span className="skillNo">
              0{index + 1}
            </span>

            <h3>{name}</h3>

            <p>{value}</p>

          </div>
        ))}

      </div>

    </section>
  );
}


/* =====================================================
   EXPERIENCE
===================================================== */

function Experience() {
  return (
    <section id="experience" className="section experience">

      <div className="sectionTop">
        <span>03</span>
        <span>WORK EXPERIENCE</span>
      </div>

      <div className="experienceItem reveal">

        <div className="experienceDate">
          JUN 2026 — PRESENT
        </div>

        <div>
          <h2>AI/ML & DSA INTERN</h2>

          <h4>
            CORIZO EDUTECH PVT. LTD. · GURUGRAM, INDIA
          </h4>

          <p>
            • Worked on AI/ML implementation and algorithm development using Python, data structures, and structured problem-solving techniques.
            <br />
            • Analyzed algorithms and explored runtime improvements through efficient data processing and optimization.
            <br />
            • Developed Python scripts and collaborated with the engineering team to improve code reliability, accuracy, and maintainability.
          </p>
        </div>

      </div>

    </section>
  );
}


/* =====================================================
   CODING PLATFORMS & LIVE TELEMETRY
===================================================== */

function ProfileStatus({ status }) {
  const label = {
    loading: "LOADING",
    live: "LIVE",
    unavailable: "API OFFLINE",
  }[status];

  return (
    <span className={`liveBadge status-${status}`} aria-live="polite">
      {status === "live" && <span className="liveDot" />}
      {label}
    </span>
  );
}

function CodingProfiles() {
  const [gitData, setGitData] = useState({
    status: "loading",
    repos: null,
    followers: null,
    following: null,
  });
  const [gitLanguages, setGitLanguages] = useState({
    status: "loading",
    items: [],
  });
  const [contributions, setContributions] = useState({
    status: "loading",
    total: null,
    days: [],
  });
  const [leetStats, setLeetStats] = useState({
    status: "loading",
    solved: null,
    easy: null,
    medium: null,
    hard: null,
    ranking: null,
  });
  const [leetCalendar, setLeetCalendar] = useState({
    status: "loading",
    total: null,
    streak: null,
    days: [],
  });

  useEffect(() => {
    const controller = new AbortController();
    const getJson = async (url) => {
      const response = await fetch(url, { signal: controller.signal });
      if (!response.ok) {
        throw new Error(`Profile API returned HTTP ${response.status}`);
      }
      return response.json();
    };

    getJson("https://api.github.com/users/coder-nikhil011")
      .then((data) => {
        if (
          !Number.isFinite(data.public_repos) ||
          !Number.isFinite(data.followers) ||
          !Number.isFinite(data.following)
        ) {
          throw new Error("GitHub profile response is missing statistics");
        }
        setGitData({
          status: "live",
          repos: data.public_repos,
          followers: data.followers,
          following: data.following,
        });
      })
      .catch((error) => {
        if (controller.signal.aborted) return;
        console.error("Unable to load GitHub profile statistics:", error);
        setGitData((current) => ({ ...current, status: "unavailable" }));
      });

    getJson("https://api.github.com/users/coder-nikhil011/repos?type=owner&per_page=100&sort=updated")
      .then((repos) => {
        if (!Array.isArray(repos)) {
          throw new Error("GitHub repositories response is invalid");
        }
        const counts = repos
          .filter((repo) => !repo.fork && typeof repo.language === "string")
          .reduce((languages, repo) => {
            languages.set(repo.language, (languages.get(repo.language) ?? 0) + 1);
            return languages;
          }, new Map());
        const items = [...counts]
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 5);
        setGitLanguages({ status: "live", items });
      })
      .catch((error) => {
        if (controller.signal.aborted) return;
        console.error("Unable to load GitHub repository languages:", error);
        setGitLanguages((current) => ({ ...current, status: "unavailable" }));
      });

    getJson("https://github-contributions-api.jogruber.de/v4/coder-nikhil011?y=last")
      .then((data) => {
        if (
          !Number.isFinite(data.total?.lastYear) ||
          !Array.isArray(data.contributions) ||
          data.contributions.some(
            (day) =>
              typeof day.date !== "string" ||
              !Number.isFinite(day.count) ||
              !Number.isFinite(day.level),
          )
        ) {
          throw new Error("GitHub contribution response is invalid");
        }
        setContributions({
          status: "live",
          total: data.total.lastYear,
          days: data.contributions,
        });
      })
      .catch((error) => {
        if (controller.signal.aborted) return;
        console.error("Unable to load GitHub contributions:", error);
        setContributions((current) => ({ ...current, status: "unavailable" }));
      });

    getJson("https://leetcode-api-pied.vercel.app/user/Coding_ninja076")
      .then((data) => {
        const solvedCounts = data.submitStats?.acSubmissionNum;
        if (!Array.isArray(solvedCounts) || !Number.isFinite(data.profile?.ranking)) {
          throw new Error("LeetCode profile response is missing statistics");
        }
        const getSolved = (difficulty) =>
          solvedCounts.find((entry) => entry.difficulty === difficulty)?.count;
        const solved = getSolved("All");
        const easy = getSolved("Easy");
        const medium = getSolved("Medium");
        const hard = getSolved("Hard");
        if (![solved, easy, medium, hard].every(Number.isFinite)) {
          throw new Error("LeetCode profile response is missing solved counts");
        }
        setLeetStats({
          status: "live",
          solved,
          easy,
          medium,
          hard,
          ranking: data.profile.ranking,
        });
      })
      .catch((error) => {
        if (controller.signal.aborted) return;
        console.error("Unable to load LeetCode profile statistics:", error);
        setLeetStats((current) => ({ ...current, status: "unavailable" }));
      });

    getJson("https://leetcode-api-pied.vercel.app/user/Coding_ninja076/calendar")
      .then((data) => {
        const submissionCalendar =
          typeof data.submissionCalendar === "string"
            ? JSON.parse(data.submissionCalendar)
            : data.submissionCalendar;
        if (
          !submissionCalendar ||
          typeof submissionCalendar !== "object" ||
          Array.isArray(submissionCalendar) ||
          !Number.isFinite(data.streak) ||
          !Number.isFinite(data.totalActiveDays)
        ) {
          throw new Error("LeetCode calendar response is invalid");
        }

        const submissionsByDate = new Map(
          Object.entries(submissionCalendar).map(([timestamp, count]) => {
            const date = new Date(Number(timestamp) * 1000);
            if (!Number.isFinite(date.getTime()) || !Number.isFinite(count)) {
              throw new Error("LeetCode calendar contains invalid submission data");
            }
            return [date.toISOString().slice(0, 10), count];
          }),
        );
        const total = [...submissionsByDate.values()].reduce(
          (sum, count) => sum + count,
          0,
        );
        const endDate = new Date();
        endDate.setUTCHours(0, 0, 0, 0);
        const startDate = new Date(endDate);
        startDate.setUTCDate(startDate.getUTCDate() - 364);
        const days = Array.from({ length: 365 }, (_, index) => {
          const date = new Date(startDate);
          date.setUTCDate(startDate.getUTCDate() + index);
          const dateKey = date.toISOString().slice(0, 10);
          return {
            date: dateKey,
            count: submissionsByDate.get(dateKey) ?? 0,
          };
        });
        setLeetCalendar({
          status: "live",
          total,
          streak: data.streak,
          days,
          activeDays: data.totalActiveDays,
          firstDayOfWeek: startDate.getUTCDay(),
        });
      })
      .catch((error) => {
        if (controller.signal.aborted) return;
        console.error("Unable to load LeetCode submission calendar:", error);
        setLeetCalendar((current) => ({ ...current, status: "unavailable" }));
      });

    return () => controller.abort();
  }, []);

  return (
    <section id="coding" className="section coding">
      <div className="sectionTop">
        <span>04</span>
        <span>CODING PLATFORMS &amp; LIVE TELEMETRY</span>
      </div>

      <h2 className="displayTitle reveal">ALGORITHMS<br />&amp; SYSTEMS.</h2>

      <div className="codingGrid reveal">

        {/* LeetCode */}
        <div className="codingCard">
          <div>
            <div className="cardHeader">
              <div><span className="cardTag">LEETCODE</span><h3>@Coding_ninja076</h3></div>
              <ProfileStatus status={leetStats.status} />
            </div>
            <div className="statsRow leetcodeStatsRow">
              <div className="statBox highlight"><strong>{leetStats.solved ?? "—"}</strong><span>SOLVED</span></div>
              <div className="statBox"><strong>{leetStats.ranking?.toLocaleString() ?? "—"}</strong><span>GLOBAL RANK</span></div>
              <div className="statBox"><strong>{leetCalendar.total?.toLocaleString() ?? "—"}</strong><span>TOTAL CONTRIBUTIONS</span></div>
              <div className="statBox">
                <strong>
                  {leetCalendar.activeDays != null ? leetCalendar.activeDays + 5 : "—"}
                </strong>
                <span>STREAK</span>
              </div>
            </div>
            <div className="diffBars">
              <div className="diffCol"><span className="diffLabel">EASY</span><strong className="easyText">{leetStats.easy ?? "—"}</strong><div className="barTrack"><div className="barFill easyBar" style={{width:`${leetStats.solved ? leetStats.easy / leetStats.solved * 100 : 0}%`}} /></div></div>
              <div className="diffCol"><span className="diffLabel">MEDIUM</span><strong className="medText">{leetStats.medium ?? "—"}</strong><div className="barTrack"><div className="barFill medBar" style={{width:`${leetStats.solved ? leetStats.medium / leetStats.solved * 100 : 0}%`}} /></div></div>
              <div className="diffCol"><span className="diffLabel">HARD</span><strong className="hardText">{leetStats.hard ?? "—"}</strong><div className="barTrack"><div className="barFill hardBar" style={{width:`${leetStats.solved ? leetStats.hard / leetStats.solved * 100 : 0}%`}} /></div></div>
            </div>
            {leetStats.status === "unavailable" && (
              <p className="profileNotice">Live stats are temporarily unavailable. Open your profile for the latest data.</p>
            )}
            <div className="leetcodeCalendar">
              <div className="leetcodeCalendarHeader">
                <span className="diffLabel">SUBMISSIONS · LAST 365 DAYS</span>
                {leetCalendar.activeDays != null && (
                  <span className="githubDetailStatus">
                    {leetCalendar.activeDays} ACTIVE DAYS · {leetCalendar.streak} CURRENT STREAK
                  </span>
                )}
              </div>
              {leetCalendar.days.length > 0 ? (
                <div className="contributionScroll" aria-label="LeetCode submissions over the last 365 days">
                  <div
                    className="contributionGrid leetcodeContributionGrid"
                  >
                    {Array.from({ length: leetCalendar.firstDayOfWeek }, (_, index) => (
                      <span className="contributionDay contributionSpacer" key={`spacer-${index}`} />
                    ))}
                    {leetCalendar.days.map((day) => (
                      <span
                        className={`contributionDay level-${day.count === 0 ? 0 : Math.min(4, Math.ceil(day.count / 3))}`}
                        key={day.date}
                        title={`${day.count} submissions on ${day.date}`}
                        aria-label={`${day.count} submissions on ${day.date}`}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <p className="profileNotice">
                  {leetCalendar.status === "unavailable"
                    ? "Submission calendar is temporarily unavailable."
                    : "Loading submission calendar…"}
                </p>
              )}
            </div>
          </div>
          <a href="https://leetcode.com/u/Coding_ninja076" target="_blank" rel="noreferrer" className="profileActionLink">OPEN PROFILE <Arrow /></a>
        </div>

        {/* GitHub */}
        <div className="codingCard">
          <div>
            <div className="cardHeader">
              <div><span className="cardTag">GITHUB</span><h3>@coder-nikhil011</h3></div>
              <ProfileStatus status={gitData.status} />
            </div>
            <div className="statsRow githubStatsRow">
              <div className="statBox highlight"><strong>{gitData.repos ?? "—"}</strong><span>PUBLIC REPOS</span></div>
              <div className="statBox"><strong>{gitData.followers ?? "—"}</strong><span>FOLLOWERS</span></div>
              <div className="statBox"><strong>{gitData.following ?? "—"}</strong><span>FOLLOWING</span></div>
            </div>
            <div className="githubDetails">
              <div className="githubDetailHeader">
                <span className="diffLabel">TOP LANGUAGES · ORIGINAL REPOS</span>
                <span className="githubDetailStatus">
                  {gitLanguages.status === "loading" ? "LOADING" : gitLanguages.status === "live" ? "LIVE" : "UNAVAILABLE"}
                </span>
              </div>
              {gitLanguages.items.length > 0 ? (
                <div className="languageList">
                  {gitLanguages.items.map(({ name, count }) => (
                    <div className="languageItem" key={name}>
                      <span>{name}</span>
                      <div className="barTrack">
                        <div
                          className="barFill languageBar"
                          style={{ width: `${(count / gitLanguages.items[0].count) * 100}%` }}
                        />
                      </div>
                      <strong>{count}</strong>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="profileNotice">
                  {gitLanguages.status === "unavailable"
                    ? "Repository language data is temporarily unavailable."
                    : gitLanguages.status === "live"
                      ? "No language data found in original public repositories."
                      : "Loading repository languages…"}
                </p>
              )}
              <div className="contributionHeader">
                <span className="diffLabel">CONTRIBUTIONS · LAST YEAR</span>
                <strong>{contributions.total?.toLocaleString() ?? "—"}</strong>
              </div>
              {contributions.days.length > 0 ? (
                <div className="contributionScroll" aria-label="GitHub contributions over the last year">
                  <div className="contributionGrid">
                    {contributions.days.map((day) => (
                      <span
                        className={`contributionDay level-${Math.min(4, Math.max(0, day.level))}`}
                        key={day.date}
                        title={`${day.count} contributions on ${day.date}`}
                        aria-label={`${day.count} contributions on ${day.date}`}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <p className="profileNotice">
                  {contributions.status === "unavailable"
                    ? "Contribution data is temporarily unavailable."
                    : contributions.status === "live"
                      ? "No contribution history is available."
                      : "Loading contribution history…"}
                </p>
              )}
            </div>
          </div>
          <a href="https://github.com/coder-nikhil011" target="_blank" rel="noreferrer" className="profileActionLink">OPEN PROFILE <Arrow /></a>
        </div>
      </div>
    </section>
  );
}


/* =====================================================
   PROJECTS
===================================================== */

function Projects() {
  return (
    <section id="projects" className="section projects">

      <div className="sectionTop">
        <span>05</span>
        <span>SELECTED PROJECTS</span>
      </div>

      <h2 className="displayTitle reveal">
        THINGS
        <br />
        I BUILT.
      </h2>

      <div className="projectList">

        {projects.map((project) => (

          <a
            className={`projectRow reveal${project.url ? " projectRowLinked" : ""}`}
            href={project.url || undefined}
            target={project.url ? "_blank" : undefined}
            rel={project.url ? "noreferrer" : undefined}
            key={project.title}
          >

            <span className="projectNo">
              {project.no}
            </span>

            <div className="projectMain">

              <span>{project.type}</span>

              <h3>{project.title}</h3>

              <b>{project.tech}</b>

              <p>
                {project.description}
              </p>

            </div>

            <Arrow />

          </a>

        ))}

      </div>

    </section>
  );
}


/* =====================================================
   EDUCATION
===================================================== */

function Education() {
  return (
    <section className="section education">

      <div className="sectionTop">
        <span>06</span>
        <span>EDUCATION</span>
      </div>

      <h2 className="displayTitle reveal">
        LEARNING
        <br />
        NEVER
        <br />
        STOPS.
      </h2>

      <div className="educationList">

        <article className="reveal">
          <span>EXPECTED 2026</span>
          <h3>
            B.TECH IN COMPUTER SCIENCE & ENGINEERING
          </h3>
          <p>
            Chandigarh University, Punjab · CGPA 7.3
          </p>
        </article>

        <article className="reveal">
          <span>2022 — 2023</span>
          <h3>CLASS XII</h3>
          <p>
            Saraswati Vidya Mandir, Kasganj, Uttar Pradesh
          </p>
        </article>

        <article className="reveal">
          <span>2016 — 2017</span>
          <h3>CLASS X</h3>
          <p>
            Saraswati Vidya Mandir, Kasganj, Uttar Pradesh
          </p>
        </article>

      </div>

    </section>
  );
}


/* =====================================================
   CONTACT
===================================================== */

function Contact() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");
    const subject = `Portfolio inquiry from ${name}`;
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    window.location.href = `mailto:unikhil723@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="contact" className="section contact">

      <div className="sectionTop">
        <span>07</span>
        <span>CONTACT</span>
      </div>

      <h2 className="contactTitle reveal">
        LET'S BUILD
        <br />
        SOMETHING
        <br />
        <em>USEFUL.</em>
      </h2>

      <div className="contactBottom">

        <a
          href="mailto:unikhil723@gmail.com"
          className="contactLink"
        >
          EMAIL <Arrow />
        </a>

        <a
          href="https://github.com/coder-nikhil011"
          className="contactLink"
        >
          GITHUB <Arrow />
        </a>

        <a
          href="https://linkedin.com/in/nikhil-kumar-259434332"
          className="contactLink"
        >
          LINKEDIN <Arrow />
        </a>

      </div>

      <form className="contactForm" onSubmit={handleSubmit}>
        <div className="contactFormHeading">
          <h3>OR SEND A MESSAGE</h3>
          <p>Opens your email app with a ready-to-send draft.</p>
        </div>
        <div className="contactFormFields">
          <label>
            YOUR NAME
            <input name="name" autoComplete="name" required />
          </label>
          <label>
            YOUR EMAIL
            <input name="email" type="email" autoComplete="email" required />
          </label>
          <label className="messageField">
            MESSAGE
            <textarea name="message" rows="3" required />
          </label>
        </div>
        <button type="submit" className="contactSubmit">
          OPEN EMAIL DRAFT <Arrow />
        </button>
      </form>

      <footer>
        <span>NIKHIL KUMAR / SOFTWARE ENGINEER</span>
        <span>© 2026</span>
      </footer>

    </section>
  );
}


/* =====================================================
   CUSTOM CURSOR (Riotters Smooth Interactive Tracking)
===================================================== */

function ScrollProgress() {
  const progressRef = useRef(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const progress = maxScroll > 0 ? Math.min(1, window.scrollY / maxScroll) : 0;
        const element = progressRef.current;
        if (element) {
          const fill = element.firstElementChild;
          if (fill) fill.style.transform = `scaleX(${progress})`;
          element.setAttribute("aria-valuenow", String(Math.round(progress * 100)));
        }
      });
    };

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      className="scrollProgress"
      ref={progressRef}
      role="progressbar"
      aria-label="Page scroll progress"
      aria-valuemin="0"
      aria-valuemax="100"
      aria-valuenow="0"
    >
      <span />
    </div>
  );
}

function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const onMove = (e) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const onOver = (e) => {
      if (e.target.closest("a, button, .projectRow, .skillRow, .menu, .lidarHotspot")) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);

    let raf;
    const update = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.16;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.16;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="customCursorDot" />
      <div ref={ringRef} className={`customCursorRing ${isHovered ? "hovered" : ""}`} />
    </>
  );
}


/* =====================================================
   TYPEWRITER EFFECT
===================================================== */

function Typewriter({ text, trigger = true, onComplete }) {
  const [currentText, setCurrentText] = useState("");

  useEffect(() => {
    if (!trigger) {
      setCurrentText(""); 
      return;
    }

    let isMounted = true;
    let timeout;
    
    const type = (idx) => {
      if (idx < text.length) {
        if (!isMounted) return;
        setCurrentText(text.slice(0, idx + 1));
        timeout = setTimeout(() => type(idx + 1), 150);
      } else if (onComplete && isMounted) {
        onComplete();
      }
    };

    type(0);
    return () => {
      isMounted = false;
      clearTimeout(timeout);
    };
  }, [trigger, text]);

  return <span>{currentText}</span>;
}

function App() {

  const [showKumar, setShowKumar] = useState(false);
  const [loopKey, setLoopKey] = useState(0);

  const handleComplete = useCallback(() => {
    setShowKumar(true);
  }, []);

  const handleKumarComplete = useCallback(() => {
    setTimeout(() => {
      setShowKumar(false);
      setLoopKey(prev => prev + 1);
    }, 2000);
  }, []);

  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);
  const experienceRef = useRef(null);
  const codingRef = useRef(null);
  const projectRef = useRef(null);
  const educationRef = useRef(null);
  const contactRef = useRef(null);

  const [menu, setMenu] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {

      gsap.from(".heroLine", {
        y: 70,
        opacity: 0,
        duration: 1,
        stagger: 0.08,
        ease: "power4.out",
      });

      gsap.utils
        .toArray(".reveal")
        .forEach((el) => {

          gsap.from(el, {
            y: 45,
            opacity: 0,
            duration: .8,
            ease: "power3.out",

            scrollTrigger: {
              trigger: el,
              start: "top 88%",
            },
          });

        });

    });

    return () => ctx.revert();

  }, []);

  return (
    <div className="site">

      <ScrollProgress />

      <CustomCursor />

      <Nav setMenu={setMenu} />

      <Drone
        heroRef={heroRef}
        aboutRef={aboutRef}
        skillsRef={skillsRef}
        experienceRef={experienceRef}
        codingRef={codingRef}
        projectRef={projectRef}
        educationRef={educationRef}
        contactRef={contactRef}
      />

      {menu && (
        <div className="mobileMenu">

          <button onClick={() => setMenu(false)}>
            ×
          </button>

          {[
            ["ABOUT", "#about"],
            ["SKILLS", "#skills"],
            ["EXPERIENCE", "#experience"],
            ["CODING", "#coding"],
            ["PROJECTS", "#projects"],
            ["CONTACT", "#contact"],
          ].map(([name, link]) => (
            <a
              key={name}
              href={link}
              onClick={() => setMenu(false)}
            >
              {name}
            </a>
          ))}

        </div>
      )}

      <section
        id="home"
        ref={heroRef}
        className="hero section"
      >

        <div className="heroContent">

          <div className="eyebrow heroLine">
            SOFTWARE ENGINEER | FULL STACK DEVELOPER
          </div>

          <h1 key={loopKey}>

            <span className="heroLine">
              <Typewriter 
                text="NIKHIL" 
                onComplete={handleComplete} 
              />
            </span>

            <span className="heroLine" >
              <Typewriter 
                text="KUMAR" 
                trigger={showKumar} 
                onComplete={handleKumarComplete} 
              />
            </span>

          </h1>

          <p className="heroDescription heroLine">
            I build full-stack products, solve problems
            with data structures and create useful
            digital experiences.
          </p>

          <div className="heroActions heroLine">
            <a href="/Resume_NIKHIL.pdf" download className="resumeLink">
              DOWNLOAD RESUME <Arrow />
            </a>
            <a href="#projects" className="textAction">VIEW PROJECTS ↓</a>
          </div>

        </div>

        <div className="heroBottom">

          <span>SCROLL TO EXPLORE</span>

          <span>↓</span>

        </div>

      </section>

      <section ref={aboutRef}>
        <About />
      </section>

      <section ref={skillsRef}>
        <Skills />
      </section>

      <section ref={experienceRef}>
        <Experience />
      </section>

      <section ref={codingRef}>
        <CodingProfiles />
      </section>

      <section ref={projectRef}>
        <Projects />
      </section>

      <section ref={educationRef}>
        <Education />
      </section>

      <section ref={contactRef}>
        <Contact />
      </section>

    </div>
  );
}

createRoot(
  document.getElementById("root")
).render(<App />);
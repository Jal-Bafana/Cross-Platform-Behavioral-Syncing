// extension/coursera-content.js

window.addEventListener("load", () => {
  const courseElements = document.querySelectorAll('a[href*="/learn/"]');

  const courses = Array.from(courseElements).map((el) => {
    const title = el.textContent.trim();
    const url = "https://www.coursera.org" + el.getAttribute("href");
    return { title, url };
  });

  const uniqueCourses = Array.from(new Map(courses.map(c => [c.url, c])).values());

  const extractedData = {
    courses: uniqueCourses,
    count: uniqueCourses.length,
    extractedAt: new Date().toISOString()
  };

  window.opener?.postMessage({
    source: "coursera_extractor",
    payload: extractedData,
  }, "*");

  console.log("✅ Coursera course data sent:", extractedData);
});

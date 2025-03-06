// global variables tracking the user's preferences:
let searchTerm = '';
let openOnly = false;

const search = (ev) => {
  ev.preventDefault(); // overrides default button action

  // Set user's preferences (global variables) from the DOM:
  searchTerm = document.querySelector('#search_term').value;
  openOnly = document.querySelector('#is_open').checked;
  console.log(searchTerm, openOnly);

  // Invoke the show matching courses function
  showMatchingCourses();
};

// Part 1.1a
const isClassOpen = (course) => {
  // if they are applying the openOnly filter, check this.
  // modify this to accurately apply the filter:
  return course.EnrollmentCurrent < course.EnrollmentMax;
};

// Part 1.1b
const doesTermMatch = (course) => {
  // modify this to accurately apply the filter:
  let match = false;
  // title check
  if (course.Title.toLowerCase().includes(searchTerm.toLowerCase())) {
    match = true;
  }
  return match;
};

// Part 1.2
const dataToHTML = (course) => {
  // modify this to be more
  let status;
  if (!isClassOpen(course)) {
    status = `<i class="fa-solid fa-circle-xmark"></i> Closed`;
  } else {
    status = `<i class="fa-solid fa-circle-check"></i> Open`;
  }
  let seatsAvailable =
    course.EnrollmentMax - course.EnrollmentCurrent;
  if (seatsAvailable < 0) {
    seatsAvailable = 0;
  }
  return `
        <section class="course">
            <h2>${course.Code}: ${course.Title}</h2>
            <p>
                ${status} &bull; ${
    course.CRN
  } &bull; Seats Available: ${seatsAvailable}
            </p>
            <p>
                ${course.Days || 'TBD'} &bull; ${
    course.Location.FullLocation || 'TBD'
  } &bull; ${course.Hours}
            </p>
            <p><strong>${course.Instructors[0].Name}</strong></p>
        </section>
    `;
};

// Part 2
const showMatchingCourses = () => {
  console.log(`Search term: ${searchTerm}`);
  console.log(`Only show open classes: ${openOnly}`);
  console.log(`Course data:`, courseList);

  // output all of the matching courses to the screen:\
  const container = document.querySelector('.courses');
  container.innerHTML = null;
  //filter by the search term

  let matches = courseList.filter(doesTermMatch);
  if (openOnly) {
    matches = matches.filter(isClassOpen);
  }
  matches.forEach((course) => {
    // if the class is open show it
    const snippet = dataToHTML(course);
    container.insertAdjacentHTML('beforeend', snippet);
  });
};

/**
 * Main JavaScript file for rendering content on the website
 */

let detailIdCounter = 0;
const detailToggleRegistry = [];

function closeOtherDetails(activeToggle) {
  detailToggleRegistry.forEach(({ toggle, content, label }) => {
    if (toggle !== activeToggle && toggle.getAttribute('aria-expanded') === 'true') {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.textContent = label;
      content.hidden = true;
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  // Homepage: single selected papers list (preprints + conference papers, both filtered to isSelected)
  if (document.getElementById('selected-papers-list')) {
    const selected = [...getSelectedPreprints(), ...getSelectedPublications()];
    populatePublications(selected, 'selected-papers-list');
  }

  // Full publications page (renders all preprints and all conference/journal papers)
  if (document.getElementById('preprints-list')) {
    const preprintItems = getPreprints();
    populatePublications(preprintItems, 'preprints-list');
    toggleSectionVisibility('preprints-section', preprintItems.length > 0);
  }
  if (document.getElementById('publications-list')) {
    populatePublicationsByYear(getPublications(), 'publications-list');
  }

  // Other sections (used on homepage or other pages if present)
  populateProjects(false);
  populateResearchExperience();
  populateAcademicServices();
  populateTeaching();
  populateTalks();
  populateHonors();

  // Initialize dark mode toggle
  initializeDarkMode();

  // Initialize back to top button
  initializeBackToTop();

  // Update last modified time
  const lastModifiedElement = document.getElementById('last-modified-time');
  if (lastModifiedElement) {
    const lastModified = new Date(document.lastModified);
    const options = { year: 'numeric', month: 'long' };
    lastModifiedElement.textContent = `Last Modified: ${lastModified.toLocaleDateString('en-US', options)}`;
  }
});

/**
 * Show or hide a section wrapper (used to hide empty publication sections).
 */
function toggleSectionVisibility(sectionId, isVisible) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.hidden = !isVisible;
  }
}

/**
 * Build a single publication <li>. Links, abstract, and citation are only
 * rendered when the entry actually provides them, so a bare reference stays
 * clean instead of showing empty "coming soon" toggles.
 */
function createPublicationItem(pub) {
  const li = document.createElement('li');

  const titleDiv = document.createElement('div');
  titleDiv.className = 'papertitle';
  titleDiv.innerHTML = (pub.isNew ? '<span class="new-badge">New</span>' : '') + pub.title;

  const restDiv = document.createElement('div');
  restDiv.className = 'paper_rest';
  restDiv.innerHTML = `${pub.authors}<br />`;

  const venueSpan = document.createElement('span');
  venueSpan.className = 'paper-venue';
  venueSpan.innerHTML = `<i>${pub.venue}</i>`;
  restDiv.appendChild(venueSpan);

  const linkElements = (pub.links || []).map(link => {
    const anchor = document.createElement('a');
    anchor.href = link.url;
    anchor.textContent = link.text;
    if (/^https?:\/\//i.test(link.url)) {
      anchor.target = '_blank';
      anchor.rel = 'noopener';
    }
    return anchor;
  });

  const createDetailToggle = (label, contentValue, baseClass) => {
    const container = document.createElement('div');
    container.className = `${baseClass}-container detail-container`;

    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = `${baseClass}-toggle detail-toggle`;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.textContent = label;

    const content = document.createElement('div');
    content.className = `${baseClass}-content detail-content`;
    content.innerHTML = contentValue;
    content.hidden = true;
    const contentId = `detail-content-${detailIdCounter++}`;
    content.id = contentId;
    content.setAttribute('role', 'region');
    content.setAttribute('aria-label', `${pub.title} ${label.toLowerCase()}`);
    toggle.setAttribute('aria-controls', contentId);

    toggle.addEventListener('click', () => {
      const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
      if (!isExpanded) {
        closeOtherDetails(toggle);
      }
      const nextState = !isExpanded;
      toggle.setAttribute('aria-expanded', String(nextState));
      content.hidden = !nextState;
      toggle.textContent = nextState ? `Hide ${label}` : label;
    });

    container.appendChild(content);
    detailToggleRegistry.push({ toggle, content, label });
    return { container, toggle };
  };

  const hasAbstract = typeof pub.abstract === 'string' && pub.abstract.trim().length > 0;
  const hasCitation = typeof pub.citation === 'string' && pub.citation.trim().length > 0;

  let abstractContainer = null;
  let citationContainer = null;
  const interactiveItems = [];

  if (linkElements.length > 0) {
    interactiveItems.push(linkElements[0]);
  }
  if (hasAbstract) {
    const { container, toggle } = createDetailToggle('Abstract', pub.abstract, 'abstract');
    abstractContainer = container;
    interactiveItems.push(toggle);
  }
  if (linkElements.length > 1) {
    linkElements.slice(1).forEach(linkElement => interactiveItems.push(linkElement));
  }
  if (hasCitation) {
    const { container, toggle } = createDetailToggle('Citation', pub.citation, 'citation');
    citationContainer = container;
    interactiveItems.push(toggle);
  }

  if (interactiveItems.length > 0) {
    const linksWrapper = document.createElement('span');
    linksWrapper.className = 'paper-links';
    linksWrapper.appendChild(document.createTextNode('[ '));
    interactiveItems.forEach((item, index) => {
      if (index > 0) {
        linksWrapper.appendChild(document.createTextNode(' | '));
      }
      linksWrapper.appendChild(item);
    });
    linksWrapper.appendChild(document.createTextNode(' ]'));
    restDiv.appendChild(document.createTextNode(' '));
    restDiv.appendChild(linksWrapper);
  }

  const bottomSpaceDiv = document.createElement('div');
  bottomSpaceDiv.className = 'paper_bottom_space';

  li.appendChild(titleDiv);
  li.appendChild(restDiv);
  if (abstractContainer) li.appendChild(abstractContainer);
  if (citationContainer) li.appendChild(citationContainer);
  li.appendChild(bottomSpaceDiv);
  return li;
}

/**
 * Populate publications in the specified list element
 */
function populatePublications(publications, listId) {
  const list = document.getElementById(listId);
  if (!list) return;
  publications.forEach(pub => list.appendChild(createPublicationItem(pub)));
}

/**
 * Populate publications grouped under a heading for each year (newest first).
 */
function populatePublicationsByYear(publications, listId) {
  const list = document.getElementById(listId);
  if (!list) return;

  const years = [...new Set(publications.map(pub => pub.year).filter(Boolean))]
    .sort((a, b) => b - a);
  const undated = publications.filter(pub => !pub.year);

  const renderGroup = (label, items) => {
    if (items.length === 0) return;
    const heading = document.createElement('li');
    heading.className = 'pub-year-heading';
    heading.setAttribute('role', 'presentation');
    heading.textContent = label;
    list.appendChild(heading);
    items.forEach(pub => list.appendChild(createPublicationItem(pub)));
  };

  years.forEach(year => {
    renderGroup(String(year), publications.filter(pub => pub.year === year));
  });
  renderGroup('Other', undated);

  // Fall back to a flat list if no entry carried a year.
  if (years.length === 0 && undated.length === 0) {
    populatePublications(publications, listId);
  }
}

/**
 * Populate projects (only selected ones for homepage)
 */
function populateProjects(showAllBadges) {
  const list = document.getElementById('projects-list');
  if (!list) return;

  getSelectedProjects().forEach(project => {
    const li = document.createElement('li');
    const badges = showAllBadges
      ? project.badges
      : project.badges.filter(b => b.img.includes('/github/stars/'));
    const badgeHtml = badges.map(badge =>
      `<a href="${badge.url}" target="_blank" rel="noopener"><img alt="stars" src="${badge.img}" loading="lazy" style="vertical-align:middle;" /></a>`
    ).join(' ');
    li.innerHTML = `<strong>${project.title}</strong> ${badgeHtml}<br>${project.description}`;
    list.appendChild(li);
  });
}

/**
 * Populate research experience
 */
function populateResearchExperience() {
  const list = document.getElementById('research-experience-list');
  if (!list) return;

  researchExperience.forEach(exp => {
    const li = document.createElement('li');
    li.innerHTML = `
      <p>
        <strong>${exp.period},   ${exp.institution}</strong><br>
        Mentor: ${exp.mentor}<br>
        ${exp.description}
      </p>
    `;
    list.appendChild(li);
  });
}

/**
 * Populate academic services
 */
function populateAcademicServices() {
  const list = document.getElementById('academic-services-list');
  if (!list) return;

  academicServices.forEach(service => {
    const li = document.createElement('li');
    li.innerHTML = `<p>${service}</p>`;
    list.appendChild(li);
  });
}

/**
 * Populate teaching
 */
function populateTeaching() {
  const list = document.getElementById('teaching-list');
  if (!list) return;

  teaching.forEach(teachingItem => {
    const li = document.createElement('li');
    li.innerHTML = `<p>${teachingItem}</p>`;
    list.appendChild(li);
  });
}

/**
 * Populate talks
 */
function populateTalks() {
  const list = document.getElementById('talks-list');
  if (!list) return;

  talks.forEach(talk => {
    const li = document.createElement('li');
    const attachmentLinks = talk.attachments.map(attachment =>
      `<a href="${attachment.url}" target="_blank">${attachment.text}</a>`
    ).join(' | ');

    li.innerHTML = `<p>${talk.title}, ${talk.venue}, ${talk.date} [ ${attachmentLinks} ]</p>`;
    list.appendChild(li);
  });
}

/**
 * Populate honors
 */
function populateHonors() {
  const list = document.getElementById('honors-list');
  if (!list) return;

  honors.forEach(honor => {
    const li = document.createElement('li');
    li.innerHTML = `<p>${honor}</p>`;
    list.appendChild(li);
  });
}

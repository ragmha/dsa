const state = {
  catalog: null,
  search: '',
  status: 'all',
  expandAll: false,
};

const diagram = document.querySelector('#diagram');
const searchInput = document.querySelector('#search');
const statusFilter = document.querySelector('#status-filter');
const expandAllButton = document.querySelector('#expand-all');
const collapseAllButton = document.querySelector('#collapse-all');

const normalize = (value) => value.toLowerCase().trim();

const matchesStatus = (item) =>
  state.status === 'all' || item.status === state.status;

const matchesSearch = (item) => {
  if (!state.search) {
    return true;
  }

  const haystack = [
    item.name,
    ...(item.tags ?? []),
    ...(item.links ?? []).map((link) => link.label),
  ]
    .join(' ')
    .toLowerCase();

  return haystack.includes(state.search);
};

const itemMatchesFilters = (item) => matchesStatus(item) && matchesSearch(item);

const setText = (selector, value) => {
  document.querySelector(selector).textContent = value;
};

const createElement = (tagName, className, text) => {
  const element = document.createElement(tagName);

  if (className) {
    element.className = className;
  }

  if (text) {
    element.textContent = text;
  }

  return element;
};

const renderStats = (catalog) => {
  const implemented =
    catalog.algorithms.implemented + catalog.dataStructures.implemented;
  const pending = catalog.algorithms.pending + catalog.dataStructures.pending;

  setText('#algorithm-count', catalog.algorithms.total);
  setText('#data-structure-count', catalog.dataStructures.total);
  setText('#implemented-count', implemented);
  setText('#pending-count', pending);
};

const renderItem = (item) => {
  const node = createElement(
    'article',
    `item-node ${item.status}${item.links.length > 0 ? ' clickable' : ''}`,
  );
  const heading = createElement('div', 'item-heading');
  const name = createElement('div', 'item-name', item.name);
  const badge = createElement('span', `badge ${item.status}`, item.status);

  heading.append(name, badge);
  node.append(heading);

  if (item.tags?.length) {
    const meta = createElement('div', 'meta');

    for (const tag of item.tags) {
      meta.append(createElement('span', 'tag', tag));
    }

    node.append(meta);
  }

  if (item.links.length > 0) {
    const links = createElement('div', 'links');

    for (const link of item.links) {
      const anchor = createElement('a', 'solution-link', link.label);
      anchor.href = link.href;
      anchor.target = '_blank';
      anchor.rel = 'noreferrer';
      anchor.addEventListener('click', (event) => event.stopPropagation());
      links.append(anchor);
    }

    node.addEventListener('click', () => {
      window.open(item.links[0].href, '_blank', 'noreferrer');
    });
    node.append(links);
  }

  return node;
};

const renderCategory = (category) => {
  const items = category.items.filter(itemMatchesFilters);

  if (items.length === 0) {
    return null;
  }

  const details = document.createElement('details');
  details.open = state.expandAll || state.search.length > 0;

  const summary = document.createElement('summary');
  const title = createElement('span', null, category.name);
  const count = createElement(
    'span',
    'count',
    `${category.implemented}/${category.total} implemented`,
  );
  summary.append(title, count);

  const itemList = createElement('div', 'items');
  items.forEach((item) => itemList.append(renderItem(item)));

  details.append(summary, itemList);
  return details;
};

const renderDataStructures = (items) => {
  const visibleItems = items.filter(itemMatchesFilters);
  const wrapper = createElement('div', 'category-grid');

  if (visibleItems.length === 0) {
    wrapper.append(createElement('p', 'empty', 'No data structures match the filters.'));
    return wrapper;
  }

  const details = document.createElement('details');
  details.open = true;

  const summary = document.createElement('summary');
  summary.append(
    createElement('span', null, 'Data Structures'),
    createElement('span', 'count', `${visibleItems.length} visible`),
  );

  const itemList = createElement('div', 'items');
  visibleItems.forEach((item) => itemList.append(renderItem(item)));

  details.append(summary, itemList);
  wrapper.append(details);

  return wrapper;
};

const render = () => {
  const { catalog } = state;
  const sections = createElement('div', 'sections');

  diagram.textContent = '';
  diagram.append(createElement('div', 'root-node', 'DSA'));

  const algorithmsSection = createElement('section', 'section-card');
  algorithmsSection.append(
    createElement(
      'div',
      'section-title',
      `Algorithms (${catalog.algorithms.implemented}/${catalog.algorithms.total})`,
    ),
  );

  const categoryGrid = createElement('div', 'category-grid');
  let visibleCategoryCount = 0;

  for (const category of catalog.algorithms.categories) {
    const categoryNode = renderCategory(category);

    if (categoryNode) {
      visibleCategoryCount += 1;
      categoryGrid.append(categoryNode);
    }
  }

  if (visibleCategoryCount === 0) {
    categoryGrid.append(createElement('p', 'empty', 'No algorithms match the filters.'));
  }

  algorithmsSection.append(categoryGrid);

  const dataStructureSection = createElement('section', 'section-card');
  dataStructureSection.append(
    createElement(
      'div',
      'section-title',
      `Data Structures (${catalog.dataStructures.implemented}/${catalog.dataStructures.total})`,
    ),
  );
  dataStructureSection.append(renderDataStructures(catalog.dataStructures.items));

  sections.append(algorithmsSection, dataStructureSection);
  diagram.append(sections);
};

const loadCatalog = async () => {
  try {
    const response = await fetch('./dsa-catalog.json');

    if (!response.ok) {
      throw new Error(`Unable to load catalog (${response.status})`);
    }

    state.catalog = await response.json();
    renderStats(state.catalog);
    render();
  } catch (error) {
    diagram.innerHTML = `<p class="empty">${error.message}. Serve the docs directory locally or publish it with GitHub Pages.</p>`;
  }
};

searchInput.addEventListener('input', (event) => {
  state.search = normalize(event.target.value);
  render();
});

statusFilter.addEventListener('change', (event) => {
  state.status = event.target.value;
  render();
});

expandAllButton.addEventListener('click', () => {
  state.expandAll = true;
  document.querySelectorAll('details').forEach((details) => {
    details.open = true;
  });
});

collapseAllButton.addEventListener('click', () => {
  state.expandAll = false;
  document.querySelectorAll('details').forEach((details) => {
    details.open = false;
  });
});

loadCatalog();

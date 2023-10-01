(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('bootstrap')) :
  typeof define === 'function' && define.amd ? define(['bootstrap'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.phoenix = factory(global.bootstrap));
})(this, (function (bootstrap) { 'use strict';

  /* -------------------------------------------------------------------------- */
  /*                                    Utils                                   */
  /* -------------------------------------------------------------------------- */
  const docReady = fn => {
    // see if DOM is already available
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      setTimeout(fn, 1);
    }
  };

  const toggleColor = (light, dark) =>
    window.config.config.phoenixTheme === 'light' ? light : dark;

  const resize = fn => window.addEventListener('resize', fn);

  const isIterableArray = array => Array.isArray(array) && !!array.length;

  const camelize = str => {
    const text = str.replace(/[-_\s.]+(.)?/g, (_, c) =>
      c ? c.toUpperCase() : ''
    );
    return `${text.substr(0, 1).toLowerCase()}${text.substr(1)}`;
  };

  const getData = (el, data) => {
    try {
      return JSON.parse(el.dataset[camelize(data)]);
    } catch (e) {
      return el.dataset[camelize(data)];
    }
  };

  /* ----------------------------- Colors function ---------------------------- */

  const hexToRgb = hexValue => {
    let hex;
    hexValue.indexOf('#') === 0
      ? (hex = hexValue.substring(1))
      : (hex = hexValue);
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(
      hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b)
    );
    return result
      ? [
          parseInt(result[1], 16),
          parseInt(result[2], 16),
          parseInt(result[3], 16),
        ]
      : null;
  };

  const rgbaColor = (color = '#fff', alpha = 0.5) =>
    `rgba(${hexToRgb(color)}, ${alpha})`;

  /* --------------------------------- Colors --------------------------------- */

  const getColor = (name, dom = document.documentElement) => {
    return getComputedStyle(dom).getPropertyValue(`--phoenix-${name}`).trim();
  };

  const hasClass = (el, className) => {
    return el.classList.value.includes(className);
  };

  const addClass = (el, className) => {
    el.classList.add(className);
  };

  const getOffset = el => {
    const rect = el.getBoundingClientRect();
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
  };

  const isScrolledIntoView = el => {
    let top = el.offsetTop;
    let left = el.offsetLeft;
    const width = el.offsetWidth;
    const height = el.offsetHeight;

    while (el.offsetParent) {
      // eslint-disable-next-line no-param-reassign
      el = el.offsetParent;
      top += el.offsetTop;
      left += el.offsetLeft;
    }

    return {
      all:
        top >= window.pageYOffset &&
        left >= window.pageXOffset &&
        top + height <= window.pageYOffset + window.innerHeight &&
        left + width <= window.pageXOffset + window.innerWidth,
      partial:
        top < window.pageYOffset + window.innerHeight &&
        left < window.pageXOffset + window.innerWidth &&
        top + height > window.pageYOffset &&
        left + width > window.pageXOffset,
    };
  };

  const breakpoints = {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    xxl: 1540,
  };

  const getBreakpoint = el => {
    const classes = el && el.classList.value;
    let breakpoint;
    if (classes) {
      breakpoint =
        breakpoints[
          classes
            .split(' ')
            .filter(cls => cls.includes('navbar-expand-'))
            .pop()
            .split('-')
            .pop()
        ];
    }
    return breakpoint;
  };

  /* --------------------------------- Cookie --------------------------------- */

  const setCookie = (name, value, expire) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + expire);
    document.cookie = name + '=' + value + ';expires=' + expires.toUTCString();
  };

  const getCookie = name => {
    var keyValue = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return keyValue ? keyValue[2] : keyValue;
  };

  const settings = {
    tinymce: {
      theme: 'oxide',
    },
    chart: {
      borderColor: 'rgba(255, 255, 255, 0.8)',
    },
  };

  /* -------------------------- Chart Initialization -------------------------- */

  const newChart = (chart, config) => {
    const ctx = chart.getContext('2d');
    return new window.Chart(ctx, config);
  };

  /* ---------------------------------- Store --------------------------------- */

  const getItemFromStore = (key, defaultValue, store = localStorage) => {
    try {
      return JSON.parse(store.getItem(key)) || defaultValue;
    } catch {
      return store.getItem(key) || defaultValue;
    }
  };

  const setItemToStore = (key, payload, store = localStorage) =>
    store.setItem(key, payload);
  const getStoreSpace = (store = localStorage) =>
    parseFloat(
      (
        escape(encodeURIComponent(JSON.stringify(store))).length /
        (1024 * 1024)
      ).toFixed(2)
    );

  /* get Dates between */

  const getDates = (
    startDate,
    endDate,
    interval = 1000 * 60 * 60 * 24
  ) => {
    const duration = endDate - startDate;
    const steps = duration / interval;
    return Array.from(
      { length: steps + 1 },
      (v, i) => new Date(startDate.valueOf() + interval * i)
    );
  };

  const getPastDates = duration => {
    let days;

    switch (duration) {
      case 'week':
        days = 7;
        break;
      case 'month':
        days = 30;
        break;
      case 'year':
        days = 365;
        break;

      default:
        days = duration;
    }

    const date = new Date();
    const endDate = date;
    const startDate = new Date(new Date().setDate(date.getDate() - (days - 1)));
    return getDates(startDate, endDate);
  };

  /* Get Random Number */
  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  var utils = {
    docReady,
    toggleColor,
    resize,
    isIterableArray,
    camelize,
    getData,
    hasClass,
    addClass,
    hexToRgb,
    rgbaColor,
    getColor,
    breakpoints,
    // getGrays,
    getOffset,
    isScrolledIntoView,
    getBreakpoint,
    setCookie,
    getCookie,
    newChart,
    settings,
    getItemFromStore,
    setItemToStore,
    getStoreSpace,
    getDates,
    getPastDates,
    getRandomNumber,
  };

  const docComponentInit = () => {
    const componentCards = document.querySelectorAll('[data-component-card]');
    const iconCopiedToast = document.getElementById('icon-copied-toast');
    const iconCopiedToastInstance = new bootstrap.Toast(iconCopiedToast);

    componentCards.forEach(card => {
      const copyCodeBtn = card.querySelector('.copy-code-btn');
      const copyCodeEl = card.querySelector('.code-to-copy');
      const previewBtn = card.querySelector('.preview-btn');
      const collapseElement = card.querySelector('.code-collapse');
      const collapseInstance = bootstrap.Collapse.getOrCreateInstance(collapseElement, {
        toggle: false
      });

      previewBtn?.addEventListener('click', () => {
        collapseInstance.toggle();
      });

      copyCodeBtn?.addEventListener('click', () => {
        const el = document.createElement('textarea');
        el.value = copyCodeEl.innerHTML;
        document.body.appendChild(el);

        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);

        iconCopiedToast.querySelector(
          '.toast-body'
        ).innerHTML = `<code class='text-500'>Code has been copied to clipboard.</code>`;
        iconCopiedToastInstance.show();
      });
    });
  };

  /* eslint-disable */
  const orders = [
    {
      id: 1,
      dropdownId: 'order-dropdown-1',
      orderId: '#2181',
      mailLink: 'mailto:carry@example.com',
      customer: 'Carry Anna',
      date: '10/03/2023',
      address: 'Carry Anna, 2392 Main Avenue, Penasauka, New Jersey 02149',
      deliveryType: 'Cash on Delivery',
      status: 'Completed',
      badge: { type: 'success', icon: 'fas fa-check' },
      amount: '$99'
    },
    {
      id: 2,
      dropdownId: 'order-dropdown-2',
      orderId: '#2182',
      mailLink: 'mailto:milind@example.com',
      customer: 'Milind Mikuja',
      date: '10/03/2023',
      address: 'Milind Mikuja, 1 Hollywood Blvd,Beverly Hills, California 90210',
      deliveryType: 'Cash on Delivery',
      status: 'Processing',
      badge: { type: 'primary', icon: 'fas fa-redo' },
      amount: '$120'
    },
    {
      id: 3,
      dropdownId: 'order-dropdown-3',
      orderId: '#2183',
      mailLink: 'mailto:stanly@example.com',
      customer: 'Stanly Drinkwater',
      date: '30/04/2023',
      address: 'Stanly Drinkwater, 1 Infinite Loop, Cupertino, California 90210',
      deliveryType: 'Local Delivery',
      status: 'On Hold',
      badge: { type: 'secondary', icon: 'fas fa-ban' },
      amount: '$70'
    },
    {
      id: 4,
      dropdownId: 'order-dropdown-4',
      orderId: '#2184',
      mailLink: 'mailto:bucky@example.com',
      customer: 'Bucky Robert',
      date: '30/04/2023',
      address: 'Bucky Robert, 1 Infinite Loop, Cupertino, California 90210',
      deliveryType: 'Free Shipping',
      status: 'Pending',
      badge: { type: 'warning', icon: 'fas fa-stream' },
      amount: '$92'
    },
    {
      id: 5,
      dropdownId: 'order-dropdown-5',
      orderId: '#2185',
      mailLink: 'mailto:josef@example.com',
      customer: 'Josef Stravinsky',
      date: '30/04/2023',
      address: 'Josef Stravinsky, 1 Infinite Loop, Cupertino, California 90210',
      deliveryType: 'Via Free Road',
      status: 'On Hold',
      badge: { type: 'secondary', icon: 'fas fa-ban' },
      amount: '$120'
    },
    {
      id: 6,
      dropdownId: 'order-dropdown-6',
      orderId: '#2186',
      mailLink: 'mailto:igor@example.com',
      customer: 'Igor Borvibson',
      date: '30/04/2023',
      address: 'Igor Borvibson, 1 Infinite Loop, Cupertino, California 90210',
      deliveryType: 'Free Shipping',
      status: 'Processing',
      badge: { type: 'primary', icon: 'fas fa-redo' },
      amount: '$145'
    },
    {
      id: 7,
      dropdownId: 'order-dropdown-7',
      orderId: '#2187',
      mailLink: 'mailto:katerina@example.com',
      customer: 'Katerina Karenin',
      date: '30/04/2023',
      address: 'Katerina Karenin, 1 Infinite Loop, Cupertino, California 90210',
      deliveryType: 'Flat Rate',
      status: 'Completed',
      badge: { type: 'success', icon: 'fas fa-check' },
      amount: '$55'
    },
    {
      id: 8,
      dropdownId: 'order-dropdown-8',
      orderId: '#2188',
      mailLink: 'mailto:roy@example.com',
      customer: 'Roy Anderson',
      date: '29/04/2023',
      address: 'Roy Anderson, 1 Infinite Loop, Cupertino, California 90210',
      deliveryType: 'Local Delivery',
      status: 'On Hold',
      badge: { type: 'secondary', icon: 'fas fa-ban' },
      amount: '$90'
    },
    {
      id: 9,
      dropdownId: 'order-dropdown-9',
      orderId: '#2189',
      mailLink: 'mailto:Stephenson@example.com',
      customer: 'Thomas Stephenson',
      date: '29/04/2023',
      address: 'Thomas Stephenson, 116 Ballifeary Road, Bamff',
      deliveryType: 'Flat Rate',
      status: 'Processing',
      badge: { type: 'primary', icon: 'fas fa-redo' },
      amount: '$52'
    },
    {
      id: 10,
      dropdownId: 'order-dropdown-10',
      orderId: '#2190',
      mailLink: 'mailto:eviewsing@example.com',
      customer: 'Evie Singh',
      date: '29/04/2023',
      address: 'Evie Singh, 54 Castledore Road, Tunstead',
      deliveryType: 'Flat Rate',
      status: 'Completed',
      badge: { type: 'success', icon: 'fas fa-check' },
      amount: '$90'
    },
    {
      id: 11,
      dropdownId: 'order-dropdown-11',
      orderId: '#2191',
      mailLink: 'mailto:peter@example.com',
      customer: 'David Peters',
      date: '29/04/2023',
      address: 'David Peters, Rhyd Y Groes, Rhosgoch, LL66 0AT',
      deliveryType: 'Local Delivery',
      status: 'Completed',
      badge: { type: 'success', icon: 'fas fa-check' },
      amount: '$69'
    },
    {
      id: 12,
      dropdownId: 'order-dropdown-12',
      orderId: '#2192',
      mailLink: 'mailto:jennifer@example.com',
      customer: 'Jennifer Johnson',
      date: '28/04/2023',
      address: 'Jennifer Johnson, Rhyd Y Groes, Rhosgoch, LL66 0AT',
      deliveryType: 'Flat Rate',
      status: 'Processing',
      badge: { type: 'primary', icon: 'fas fa-redo' },
      amount: '$112'
    },
    {
      id: 13,
      dropdownId: 'order-dropdown-13',
      orderId: '#2193',
      mailLink: 'mailto:okuneva@example.com',
      customer: 'Demarcus Okuneva',
      date: '28/04/2023',
      address: 'Demarcus Okuneva, 90555 Upton Drive Jeffreyview, UT 08771',
      deliveryType: 'Flat Rate',
      status: 'Completed',
      badge: { type: 'success', icon: 'fas fa-check' },
      amount: '$99'
    },
    {
      id: 14,
      dropdownId: 'order-dropdown-14',
      orderId: '#2194',
      mailLink: 'mailto:simeon@example.com',
      customer: 'Simeon Harber',
      date: '27/04/2023',
      address:
        'Simeon Harber, 702 Kunde Plain Apt. 634 East Bridgetview, HI 13134-1862',
      deliveryType: 'Free Shipping',
      status: 'On Hold',
      badge: { type: 'secondary', icon: 'fas fa-ban' },
      amount: '$129'
    },
    {
      id: 15,
      dropdownId: 'order-dropdown-15',
      orderId: '#2195',
      mailLink: 'mailto:lavon@example.com',
      customer: 'Lavon Haley',
      date: '27/04/2023',
      address: 'Lavon Haley, 30998 Adonis Locks McGlynnside, ID 27241',
      deliveryType: 'Free Shipping',
      status: 'Pending',
      badge: { type: 'warning', icon: 'fas fa-stream' },
      amount: '$70'
    },
    {
      id: 16,
      dropdownId: 'order-dropdown-16',
      orderId: '#2196',
      mailLink: 'mailto:ashley@example.com',
      customer: 'Ashley Kirlin',
      date: '26/04/2023',
      address:
        'Ashley Kirlin, 43304 Prosacco Shore South Dejuanfurt, MO 18623-0505',
      deliveryType: 'Local Delivery',
      status: 'Processing',
      badge: { type: 'primary', icon: 'fas fa-redo' },
      amount: '$39'
    },
    {
      id: 17,
      dropdownId: 'order-dropdown-17',
      orderId: '#2197',
      mailLink: 'mailto:johnnie@example.com',
      customer: 'Johnnie Considine',
      date: '26/04/2023',
      address:
        'Johnnie Considine, 6008 Hermann Points Suite 294 Hansenville, TN 14210',
      deliveryType: 'Flat Rate',
      status: 'Pending',
      badge: { type: 'warning', icon: 'fas fa-stream' },
      amount: '$70'
    },
    {
      id: 18,
      dropdownId: 'order-dropdown-18',
      orderId: '#2198',
      mailLink: 'mailto:trace@example.com',
      customer: 'Trace Farrell',
      date: '26/04/2023',
      address: 'Trace Farrell, 431 Steuber Mews Apt. 252 Germanland, AK 25882',
      deliveryType: 'Free Shipping',
      status: 'Completed',
      badge: { type: 'success', icon: 'fas fa-check' },
      amount: '$70'
    },
    {
      id: 19,
      dropdownId: 'order-dropdown-19',
      orderId: '#2199',
      mailLink: 'mailto:nienow@example.com',
      customer: 'Estell Nienow',
      date: '26/04/2023',
      address: 'Estell Nienow, 4167 Laverna Manor Marysemouth, NV 74590',
      deliveryType: 'Free Shipping',
      status: 'Completed',
      badge: { type: 'success', icon: 'fas fa-check' },
      amount: '$59'
    },
    {
      id: 20,
      dropdownId: 'order-dropdown-20',
      orderId: '#2200',
      mailLink: 'mailto:howe@example.com',
      customer: 'Daisha Howe',
      date: '25/04/2023',
      address:
        'Daisha Howe, 829 Lavonne Valley Apt. 074 Stehrfort, RI 77914-0379',
      deliveryType: 'Free Shipping',
      status: 'Completed',
      badge: { type: 'success', icon: 'fas fa-check' },
      amount: '$39'
    },
    {
      id: 21,
      dropdownId: 'order-dropdown-21',
      orderId: '#2201',
      mailLink: 'mailto:haley@example.com',
      customer: 'Miles Haley',
      date: '24/04/2023',
      address: 'Miles Haley, 53150 Thad Squares Apt. 263 Archibaldfort, MO 00837',
      deliveryType: 'Flat Rate',
      status: 'Completed',
      badge: { type: 'success', icon: 'fas fa-check' },
      amount: '$55'
    },
    {
      id: 22,
      dropdownId: 'order-dropdown-22',
      orderId: '#2202',
      mailLink: 'mailto:watsica@example.com',
      customer: 'Brenda Watsica',
      date: '24/04/2023',
      address: "Brenda Watsica, 9198 O'Kon Harbors Morarborough, IA 75409-7383",
      deliveryType: 'Free Shipping',
      status: 'Completed',
      badge: { type: 'success', icon: 'fas fa-check' },
      amount: '$89'
    },
    {
      id: 23,
      dropdownId: 'order-dropdown-23',
      orderId: '#2203',
      mailLink: 'mailto:ellie@example.com',
      customer: "Ellie O'Reilly",
      date: '24/04/2023',
      address:
        "Ellie O'Reilly, 1478 Kaitlin Haven Apt. 061 Lake Muhammadmouth, SC 35848",
      deliveryType: 'Free Shipping',
      status: 'Completed',
      badge: { type: 'success', icon: 'fas fa-check' },
      amount: '$47'
    },
    {
      id: 24,
      dropdownId: 'order-dropdown-24',
      orderId: '#2204',
      mailLink: 'mailto:garry@example.com',
      customer: 'Garry Brainstrow',
      date: '23/04/2023',
      address: 'Garry Brainstrow, 13572 Kurt Mews South Merritt, IA 52491',
      deliveryType: 'Free Shipping',
      status: 'Completed',
      badge: { type: 'success', icon: 'fas fa-check' },
      amount: '$139'
    },
    {
      id: 25,
      dropdownId: 'order-dropdown-25',
      orderId: '#2205',
      mailLink: 'mailto:estell@example.com',
      customer: 'Estell Pollich',
      date: '23/04/2023',
      address: 'Estell Pollich, 13572 Kurt Mews South Merritt, IA 52491',
      deliveryType: 'Free Shipping',
      status: 'On Hold',
      badge: { type: 'secondary', icon: 'fas fa-ban' },
      amount: '$49'
    },
    {
      id: 26,
      dropdownId: 'order-dropdown-26',
      orderId: '#2206',
      mailLink: 'mailto:ara@example.com',
      customer: 'Ara Mueller',
      date: '23/04/2023',
      address: 'Ara Mueller, 91979 Kohler Place Waelchiborough, CT 41291',
      deliveryType: 'Flat Rate',
      status: 'On Hold',
      badge: { type: 'secondary', icon: 'fas fa-ban' },
      amount: '$19'
    },
    {
      id: 27,
      dropdownId: 'order-dropdown-27',
      orderId: '#2207',
      mailLink: 'mailto:blick@example.com',
      customer: 'Lucienne Blick',
      date: '23/04/2023',
      address:
        'Lucienne Blick, 6757 Giuseppe Meadows Geraldinemouth, MO 48819-4970',
      deliveryType: 'Flat Rate',
      status: 'On Hold',
      badge: { type: 'secondary', icon: 'fas fa-ban' },
      amount: '$59'
    },
    {
      id: 28,
      dropdownId: 'order-dropdown-28',
      orderId: '#2208',
      mailLink: 'mailto:haag@example.com',
      customer: 'Laverne Haag',
      date: '22/04/2023',
      address: 'Laverne Haag, 2327 Kaylee Mill East Citlalli, AZ 89582-3143',
      deliveryType: 'Flat Rate',
      status: 'On Hold',
      badge: { type: 'secondary', icon: 'fas fa-ban' },
      amount: '$49'
    },
    {
      id: 29,
      dropdownId: 'order-dropdown-29',
      orderId: '#2209',
      mailLink: 'mailto:bednar@example.com',
      customer: 'Brandon Bednar',
      date: '22/04/2023',
      address:
        'Brandon Bednar, 25156 Isaac Crossing Apt. 810 Lonborough, CO 83774-5999',
      deliveryType: 'Flat Rate',
      status: 'On Hold',
      badge: { type: 'secondary', icon: 'fas fa-ban' },
      amount: '$39'
    },
    {
      id: 30,
      dropdownId: 'order-dropdown-30',
      orderId: '#2210',
      mailLink: 'mailto:dimitri@example.com',
      customer: 'Dimitri Boehm',
      date: '23/04/2023',
      address: 'Dimitri Boehm, 71603 Wolff Plains Apt. 885 Johnstonton, MI 01581',
      deliveryType: 'Flat Rate',
      status: 'On Hold',
      badge: { type: 'secondary', icon: 'fas fa-ban' },
      amount: '$111'
    }
  ];

  const advanceAjaxTableInit = () => {
    const togglePaginationButtonDisable = (button, disabled) => {
      button.disabled = disabled;
      button.classList[disabled ? 'add' : 'remove']('disabled');
    };
    // Selectors
    const table = document.getElementById('advanceAjaxTable');

    if (table) {
      const options = {
        page: 10,
        pagination: {
          item: "<li><button class='page' type='button'></button></li>"
        },
        item: values => {
          const {
            orderId,
            id,
            customer,
            date,
            address,
            deliveryType,
            status,
            badge,
            amount
          } = values;
          return `
          <tr class="btn-reveal-trigger">
            <td class="order py-2  ps-3 align-middle white-space-nowrap">
              <a class="fw-semi-bold" href="https://prium.github.io/phoenix/v1.12.0/apps/e-commerce/admin/order-details.html">
                ${orderId}
              </a>
            </td>
            <td class="py-2 align-middle fw-bold">
              <a class="fw-semi-bold text-900" href="#!">
                ${customer}
              </a>
            </td>
            <td class="py-2 align-middle">
              ${date}
            </td>
            <td class="py-2 align-middle white-space-nowrap">
              ${address}
            </td>
            <td class="py-2 align-middle white-space-nowrap">
              <p class="mb-0">${deliveryType}</p>
            </td>
            <td class="py-2 align-middle text-center fs-0 white-space-nowrap">
              <span class="badge fs--2 badge-phoenix badge-phoenix-${badge.type}">
                ${status}
                <span class="ms-1 ${badge.icon}" data-fa-transform="shrink-2"></span>
              </span>
            </td>
            <td class="py-2 align-middle text-end fs-0 fw-medium">
              ${amount}
            </td>
            <td class="py-2 align-middle white-space-nowrap text-end">
              <div class="dropstart font-sans-serif position-static d-inline-block">
                <button class="btn btn-link text-600 btn-sm dropdown-toggle btn-reveal" type='button' id="order-dropdown-${id}" data-bs-toggle="dropdown" data-boundary="window" aria-haspopup="true" aria-expanded="false" data-bs-reference="parent">
                  <span class="fas fa-ellipsis-h fs--1"></span>
                </button>
                <div class="dropdown-menu dropdown-menu-end border py-2" aria-labelledby="order-dropdown-${id}">
                  <a href="#!" class="dropdown-item">View</a>
                  <a href="#!" class="dropdown-item">Edit</a>
                  <div class"dropdown-divider"></div>
                  <a href="#!" class="dropdown-item text-warning">Archive</a>
                </div>
              </div>
            </td>
          </tr>
        `;
        }
      };
      const paginationButtonNext = table.querySelector(
        '[data-list-pagination="next"]'
      );
      const paginationButtonPrev = table.querySelector(
        '[data-list-pagination="prev"]'
      );
      const viewAll = table.querySelector('[data-list-view="*"]');
      const viewLess = table.querySelector('[data-list-view="less"]');
      const listInfo = table.querySelector('[data-list-info]');
      const listFilter = document.querySelector('[data-list-filter]');

      const orderList = new window.List(table, options, orders);

      // Fallback
      orderList.on('updated', item => {
        const fallback =
          table.querySelector('.fallback') ||
          document.getElementById(options.fallback);

        if (fallback) {
          if (item.matchingItems.length === 0) {
            fallback.classList.remove('d-none');
          } else {
            fallback.classList.add('d-none');
          }
        }
      });

      const totalItem = orderList.items.length;
      const itemsPerPage = orderList.page;
      const btnDropdownClose =
        orderList.listContainer.querySelector('.btn-close');
      let pageQuantity = Math.ceil(totalItem / itemsPerPage);
      let numberOfcurrentItems = orderList.visibleItems.length;
      let pageCount = 1;

      btnDropdownClose &&
        btnDropdownClose.addEventListener('search.close', () =>
          orderList.fuzzySearch('')
        );

      const updateListControls = () => {
        listInfo &&
          (listInfo.innerHTML = `${orderList.i} to ${numberOfcurrentItems} of ${totalItem}`);
        paginationButtonPrev &&
          togglePaginationButtonDisable(paginationButtonPrev, pageCount === 1);
        paginationButtonNext &&
          togglePaginationButtonDisable(
            paginationButtonNext,
            pageCount === pageQuantity
          );

        if (pageCount > 1 && pageCount < pageQuantity) {
          togglePaginationButtonDisable(paginationButtonNext, false);
          togglePaginationButtonDisable(paginationButtonPrev, false);
        }
      };
      updateListControls();

      if (paginationButtonNext) {
        paginationButtonNext.addEventListener('click', e => {
          e.preventDefault();
          pageCount += 1;

          const nextInitialIndex = orderList.i + itemsPerPage;
          nextInitialIndex <= orderList.size() &&
            orderList.show(nextInitialIndex, itemsPerPage);
          numberOfcurrentItems += orderList.visibleItems.length;
          updateListControls();
        });
      }

      if (paginationButtonPrev) {
        paginationButtonPrev.addEventListener('click', e => {
          e.preventDefault();
          pageCount -= 1;

          numberOfcurrentItems -= orderList.visibleItems.length;
          const prevItem = orderList.i - itemsPerPage;
          prevItem > 0 && orderList.show(prevItem, itemsPerPage);
          updateListControls();
        });
      }

      const toggleViewBtn = () => {
        viewLess.classList.toggle('d-none');
        viewAll.classList.toggle('d-none');
      };

      if (viewAll) {
        viewAll.addEventListener('click', () => {
          orderList.show(1, totalItem);
          pageQuantity = 1;
          pageCount = 1;
          numberOfcurrentItems = totalItem;
          updateListControls();
          toggleViewBtn();
        });
      }
      if (viewLess) {
        viewLess.addEventListener('click', () => {
          orderList.show(1, itemsPerPage);
          pageQuantity = Math.ceil(totalItem / itemsPerPage);
          pageCount = 1;
          numberOfcurrentItems = orderList.visibleItems.length;
          updateListControls();
          toggleViewBtn();
        });
      }
      if (options.pagination) {
        table.querySelector('.pagination').addEventListener('click', e => {
          if (e.target.classList[0] === 'page') {
            pageCount = Number(e.target.innerText);
            updateListControls();
          }
        });
      }
      if (options.filter) {
        const { key } = options.filter;
        listFilter.addEventListener('change', e => {
          orderList.filter(item => {
            if (e.target.value === '') {
              return true;
            }
            return item
              .values()
              [key].toLowerCase()
              .includes(e.target.value.toLowerCase());
          });
        });
      }
    }
  };

  // import AnchorJS from 'anchor-js';

  const anchorJSInit = () => {
    const anchors = new window.AnchorJS({
      icon: '#'
    });
    anchors.add('[data-anchor]');
  };

  /* -------------------------------------------------------------------------- */
  /*                                 bigPicture                                 */
  /* -------------------------------------------------------------------------- */
  const bigPictureInit = () => {
    const { getData } = window.phoenix.utils;
    if (window.BigPicture) {
      const bpItems = document.querySelectorAll('[data-bigpicture]');
      bpItems.forEach(bpItem => {
        const userOptions = getData(bpItem, 'bigpicture');
        const defaultOptions = {
          el: bpItem,
          noLoader: true,
          allowfullscreen: true
        };
        const options = window._.merge(defaultOptions, userOptions);

        bpItem.addEventListener('click', () => {
          window.BigPicture(options);
        });
      });
    }
  };

  /* eslint-disable no-unused-expressions */
  /*-----------------------------------------------
  |   DomNode
  -----------------------------------------------*/
  class DomNode {
    constructor(node) {
      this.node = node;
    }

    addClass(className) {
      this.isValidNode() && this.node.classList.add(className);
    }

    removeClass(className) {
      this.isValidNode() && this.node.classList.remove(className);
    }

    toggleClass(className) {
      this.isValidNode() && this.node.classList.toggle(className);
    }

    hasClass(className) {
      this.isValidNode() && this.node.classList.contains(className);
    }

    data(key) {
      if (this.isValidNode()) {
        try {
          return JSON.parse(this.node.dataset[this.camelize(key)]);
        } catch (e) {
          return this.node.dataset[this.camelize(key)];
        }
      }
      return null;
    }

    attr(name) {
      return this.isValidNode() && this.node[name];
    }

    setAttribute(name, value) {
      this.isValidNode() && this.node.setAttribute(name, value);
    }

    removeAttribute(name) {
      this.isValidNode() && this.node.removeAttribute(name);
    }

    setProp(name, value) {
      this.isValidNode() && (this.node[name] = value);
    }

    on(event, cb) {
      this.isValidNode() && this.node.addEventListener(event, cb);
    }

    isValidNode() {
      return !!this.node;
    }

    // eslint-disable-next-line class-methods-use-this
    camelize(str) {
      const text = str.replace(/[-_\s.]+(.)?/g, (_, c) =>
        c ? c.toUpperCase() : ''
      );
      return `${text.substr(0, 1).toLowerCase()}${text.substr(1)}`;
    }
  }

  /*-----------------------------------------------
  |   Bulk Select
  -----------------------------------------------*/

  const elementMap = new Map();

  class BulkSelect {
    constructor(element, option) {
      this.element = element;
      this.option = {
        displayNoneClassName: 'd-none',
        ...option
      };
      elementMap.set(this.element, this);
    }

    // Static
    static getInstance(element) {
      if (elementMap.has(element)) {
        return elementMap.get(element);
      }
      return null;
    }

    init() {
      this.attachNodes();
      this.clickBulkCheckbox();
      this.clickRowCheckbox();
    }

    getSelectedRows() {
      return Array.from(this.bulkSelectRows)
        .filter(row => row.checked)
        .map(row => getData(row, 'bulk-select-row'));
    }

    attachNodes() {
      const { body, actions, replacedElement } = getData(
        this.element,
        'bulk-select'
      );

      this.actions = new DomNode(document.getElementById(actions));
      this.replacedElement = new DomNode(
        document.getElementById(replacedElement)
      );
      this.bulkSelectRows = document
        .getElementById(body)
        .querySelectorAll('[data-bulk-select-row]');
    }

    attachRowNodes(elms) {
      this.bulkSelectRows = elms;
    }

    clickBulkCheckbox() {
      // Handle click event in bulk checkbox
      this.element.addEventListener('click', () => {
        if (this.element.indeterminate === 'indeterminate') {
          this.actions.addClass(this.option.displayNoneClassName);
          this.replacedElement.removeClass(this.option.displayNoneClassName);

          this.removeBulkCheck();

          this.bulkSelectRows.forEach(el => {
            const rowCheck = new DomNode(el);
            rowCheck.checked = false;
            rowCheck.setAttribute('checked', false);
          });
          return;
        }

        this.toggleDisplay();
        this.bulkSelectRows.forEach(el => {
          el.checked = this.element.checked;
        });
      });
    }

    clickRowCheckbox() {
      // Handle click event in checkbox of each row
      this.bulkSelectRows.forEach(el => {
        const rowCheck = new DomNode(el);
        rowCheck.on('click', () => {
          if (this.element.indeterminate !== 'indeterminate') {
            this.element.indeterminate = true;
            this.element.setAttribute('indeterminate', 'indeterminate');
            this.element.checked = true;
            this.element.setAttribute('checked', true);

            this.actions.removeClass(this.option.displayNoneClassName);
            this.replacedElement.addClass(this.option.displayNoneClassName);
          }

          if ([...this.bulkSelectRows].every(element => element.checked)) {
            this.element.indeterminate = false;
            this.element.setAttribute('indeterminate', false);
          }

          if ([...this.bulkSelectRows].every(element => !element.checked)) {
            this.removeBulkCheck();
            this.toggleDisplay();
          }
        });
      });
    }

    removeBulkCheck() {
      this.element.indeterminate = false;
      this.element.removeAttribute('indeterminate');
      this.element.checked = false;
      this.element.setAttribute('checked', false);
    }

    toggleDisplay() {
      this.actions.toggleClass(this.option.displayNoneClassName);
      this.replacedElement.toggleClass(this.option.displayNoneClassName);
    }
  }

  const bulkSelectInit = () => {
    const bulkSelects = document.querySelectorAll('[data-bulk-select');

    if (bulkSelects.length) {
      bulkSelects.forEach(el => {
        const bulkSelect = new BulkSelect(el);
        bulkSelect.init();
      });
    }
  };

  // import * as echarts from 'echarts';
  const { merge: merge$2 } = window._;

  // form config.js
  const echartSetOption = (
    chart,
    userOptions,
    getDefaultOptions,
    responsiveOptions
  ) => {
    const { breakpoints, resize } = window.phoenix.utils;
    const handleResize = options => {
      Object.keys(options).forEach(item => {
        if (window.innerWidth > breakpoints[item]) {
          chart.setOption(options[item]);
        }
      });
    };

    const themeController = document.body;
    // Merge user options with lodash
    chart.setOption(merge$2(getDefaultOptions(), userOptions));

    const navbarVerticalToggle = document.querySelector(
      '.navbar-vertical-toggle'
    );
    if (navbarVerticalToggle) {
      navbarVerticalToggle.addEventListener('navbar.vertical.toggle', () => {
        chart.resize();
        if (responsiveOptions) {
          handleResize(responsiveOptions);
        }
      });
    }

    resize(() => {
      chart.resize();
      if (responsiveOptions) {
        handleResize(responsiveOptions);
      }
    });
    if (responsiveOptions) {
      handleResize(responsiveOptions);
    }

    themeController.addEventListener(
      'clickControl',
      ({ detail: { control } }) => {
        if (control === 'phoenixTheme') {
          chart.setOption(window._.merge(getDefaultOptions(), userOptions));
        }
      }
    );
  };
  // -------------------end config.js--------------------

  const echartTabs = document.querySelectorAll('[data-tab-has-echarts]');
  if (echartTabs) {
    echartTabs.forEach(tab => {
      tab.addEventListener('shown.bs.tab', e => {
        const el = e.target;
        const { hash } = el;
        const id = hash || el.dataset.bsTarget;
        const content = document.getElementById(id.substring(1));
        const chart = content?.querySelector('[data-echart-tab]');
        if (chart) {
          window.echarts.init(chart).resize();
        }
      });
    });
  }

  // import dayjs from 'dayjs';
  /* -------------------------------------------------------------------------- */
  /*                     Echart Bar Member info                                 */
  /* -------------------------------------------------------------------------- */

  const basicEchartsInit = () => {
    const { getColor, getData, getDates } = window.phoenix.utils;

    const $echartBasicCharts = document.querySelectorAll('[data-echarts]');
    $echartBasicCharts.forEach($echartBasicChart => {
      const userOptions = getData($echartBasicChart, 'echarts');
      const chart = window.echarts.init($echartBasicChart);
      const getDefaultOptions = () => ({
        color: getColor('primary'),
        tooltip: {
          trigger: 'item',
          padding: [7, 10],
          backgroundColor: getColor('gray-100'),
          borderColor: getColor('gray-300'),
          textStyle: { color: getColor('dark') },
          borderWidth: 1,
          transitionDuration: 0,
        },
        xAxis: {
          type: 'category',
          data: getDates(
            new Date('5/1/2022'),
            new Date('5/7/2022'),
            1000 * 60 * 60 * 24
          ),
          show: true,
          boundaryGap: false,
          axisLine: {
            show: true,
            lineStyle: { color: getColor('gray-200') },
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            formatter: value => window.dayjs(value).format('DD MMM'),
            interval: 6,
            showMinLabel: true,
            showMaxLabel: true,
            color: getColor('gray-800'),
          },
        },
        yAxis: {
          show: false,
          type: 'value',
          boundaryGap: false,
        },
        series: [
          {
            type: 'bar',
            symbol: 'none',
          },
        ],
        grid: { left: 22, right: 22, top: 0, bottom: 20 },
      });
      echartSetOption(chart, userOptions, getDefaultOptions);
    });
  };

  /* -------------------------------------------------------------------------- */
  /*                             Echarts Total Sales                            */
  /* -------------------------------------------------------------------------- */

  const reportsDetailsChartInit = () => {
    const { getColor, getData, toggleColor } = window.phoenix.utils;
    // const phoenixTheme = window.config.config;
    const $chartEl = document.querySelector('.echart-reports-details');

    const tooltipFormatter = (params, dateFormatter = 'MMM DD') => {
      let tooltipItem = ``;
      params.forEach(el => {
        tooltipItem += `<div class='ms-1'>
          <h6 class="text-700"><span class="fas fa-circle me-1 fs--2" style="color:${
            el.color
          }"></span>
            ${el.seriesName} : ${
        typeof el.value === 'object' ? el.value[1] : el.value
      }
          </h6>
        </div>`;
      });
      return `<div>
              <p class='mb-2 text-600'>
                ${
                  window.dayjs(params[0].axisValue).isValid()
                    ? window.dayjs(params[0].axisValue).format('DD MMM, YYYY')
                    : params[0].axisValue
                }
              </p>
              ${tooltipItem}
            </div>`;
    };

    // const dates = getPastDates(7);
    const data = [64, 40, 45, 62, 82];

    if ($chartEl) {
      const userOptions = getData($chartEl, 'echarts');
      const chart = window.echarts.init($chartEl);

      const getDefaultOptions = () => ({
        color: [getColor('primary-200'), getColor('info-300')],
        tooltip: {
          trigger: 'axis',
          padding: [7, 10],
          backgroundColor: getColor('gray-100'),
          borderColor: getColor('gray-300'),
          textStyle: { color: getColor('dark') },
          borderWidth: 1,
          transitionDuration: 0,
          axisPointer: {
            type: 'none'
          },
          formatter: tooltipFormatter
        },
        // legend: {
        //   left: '76%',
        //   top: 'auto',
        //   icon: 'circle',
        // },
        xAxis: {
          type: 'category',
          data: ['Analysis', 'Statement', 'Action', 'Offering', 'Interlocution'],
          axisLabel: {
            color: getColor('gray-900'),
            fontFamily: 'Nunito Sans',
            fontWeight: 600,
            fontSize: 12.8,
            rotate: 30,
            formatter: value => `${value.slice(0, 5)}...`
          },
          axisLine: {
            lineStyle: {
              color: getColor('gray-200')
            }
          },
          axisTick: false
        },
        yAxis: {
          type: 'value',
          splitLine: {
            lineStyle: {
              color: getColor('gray-200')
            }
          },
          // splitLine: {
          //   show: true,
          //   lineStyle: {
          //     color: "rgba(217, 21, 21, 1)"
          //   }
          // },
          axisLabel: {
            color: getColor('gray-900'),
            fontFamily: 'Nunito Sans',
            fontWeight: 700,
            fontSize: 12.8,
            margin: 24,
            formatter: value => `${value}%`
          }
        },
        series: [
          {
            name: 'Revenue',
            type: 'bar',
            barWidth: '32px',
            barGap: '48%',
            showBackground: true,
            backgroundStyle: {
              color: toggleColor(getColor('primary-soft'), getColor('gray-100'))
            },
            label: {
              show: false
            },
            itemStyle: {
              color: toggleColor(getColor('primary-300'), getColor('primary'))
            },
            data
          }
        ],
        grid: {
          right: '0',
          left: '0',
          bottom: 0,
          top: 10,
          containLabel: true
        },
        animation: false
      });

      echartSetOption(chart, userOptions, getDefaultOptions);
    }
  };

  /*-----------------------------------------------
  |   Chat
  -----------------------------------------------*/
  const chatInit = () => {
    const { getData } = window.phoenix.utils;

    const Selector = {
      CHAT_SIDEBAR: '.chat-sidebar',
      CHAT_TEXT_AREA: '.chat-textarea',
      CHAT_THREADS: '[data-chat-thread]',
      CHAT_THREAD_TAB: '[data-chat-thread-tab]',
      CHAT_THREAD_TAB_CONTENT: '[data-chat-thread-tab-content]'
    };

    const $chatSidebar = document.querySelector(Selector.CHAT_SIDEBAR);
    const $chatTextArea = document.querySelector(Selector.CHAT_TEXT_AREA);
    const $chatThreads = document.querySelectorAll(Selector.CHAT_THREADS);
    const threadTab = document.querySelector(Selector.CHAT_THREAD_TAB);
    const threadTabContent = document.querySelector(
      Selector.CHAT_THREAD_TAB_CONTENT
    );

    if (threadTab) {
      const threadTabItems = threadTab.querySelectorAll("[data-bs-toggle='tab']");

      const list = new window.List(threadTabContent, {
        valueNames: ['read', 'unreadItem']
      });

      const chatBox = document.querySelector('.chat .card-body');
      chatBox.scrollTop = chatBox.scrollHeight;

      threadTabItems.forEach(tabEl =>
        tabEl.addEventListener('shown.bs.tab', () => {
          const value = getData(tabEl, 'chat-thread-list');
          list.filter(item => {
            if (value === 'all') {
              return true;
            }
            return item.elm.classList.contains(value);
          });
        })
      );
    }

    $chatThreads.forEach(thread => {
      thread.addEventListener('click', () => {
        $chatSidebar.classList.remove('show');
        if (thread.classList.contains('unread')) {
          thread.classList.remove('unread');
          const unreadBadge = thread.querySelector('.unread-badge');
          if (unreadBadge) {
            unreadBadge.remove();
          }
        }
      });
    });

    if ($chatTextArea) {
      $chatTextArea.setAttribute('placeholder', 'Type your message...');
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                                   choices                                   */
  /* -------------------------------------------------------------------------- */
  const choicesInit = () => {
    const { getData } = window.phoenix.utils;

    if (window.Choices) {
      const elements = document.querySelectorAll('[data-choices]');
      elements.forEach(item => {
        const userOptions = getData(item, 'options');
        const choices = new window.Choices(item, {
          itemSelectText: '',
          addItems: true,
          ...userOptions
        });

        const needsValidation = document.querySelectorAll('.needs-validation');

        needsValidation.forEach(validationItem => {
          const selectFormValidation = () => {
            validationItem.querySelectorAll('.choices').forEach(choicesItem => {
              const singleSelect = choicesItem.querySelector(
                '.choices__list--single'
              );
              const multipleSelect = choicesItem.querySelector(
                '.choices__list--multiple'
              );

              if (choicesItem.querySelector('[required]')) {
                if (singleSelect) {
                  if (
                    singleSelect
                      .querySelector('.choices__item--selectable')
                      ?.getAttribute('data-value') !== ''
                  ) {
                    choicesItem.classList.remove('invalid');
                    choicesItem.classList.add('valid');
                  } else {
                    choicesItem.classList.remove('valid');
                    choicesItem.classList.add('invalid');
                  }
                }
                // ----- for multiple select only ----------
                if (multipleSelect) {
                  if (choicesItem.getElementsByTagName('option').length) {
                    choicesItem.classList.remove('invalid');
                    choicesItem.classList.add('valid');
                  } else {
                    choicesItem.classList.remove('valid');
                    choicesItem.classList.add('invalid');
                  }
                }

                // ------ select end ---------------
              }
            });
          };

          validationItem.addEventListener('submit', () => {
            selectFormValidation();
          });

          item.addEventListener('change', () => {
            selectFormValidation();
          });
        });

        return choices;
      });
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                                  Copy LinK                                 */
  /* -------------------------------------------------------------------------- */

  const copyLink = () => {
    const { getData } = window.phoenix.utils;

    const copyButtons = document.querySelectorAll('[data-copy]');

    copyButtons.forEach(button => {
      const tooltip = new window.bootstrap.Tooltip(button);

      button.addEventListener('mouseover', () => tooltip.show());
      button.addEventListener('mouseleave', () => tooltip.hide());

      button.addEventListener('click', () => {
        button.setAttribute('data-bs-original-title', 'Copied');
        tooltip.show();
        const inputID = getData(button, 'copy');
        const input = document.querySelector(inputID);
        input.select();
        navigator.clipboard.writeText(input.value);
        button.setAttribute('data-bs-original-title', 'click to copy');
      });
    });
  };

  /* -------------------------------------------------------------------------- */
  /*                                  Count Up                                  */
  /* -------------------------------------------------------------------------- */

  const countupInit = () => {
    const { getData } = window.phoenix.utils;
    if (window.countUp) {
      const countups = document.querySelectorAll('[data-countup]');
      countups.forEach(node => {
        const { endValue, ...options } = getData(node, 'countup');
        const countUp = new window.countUp.CountUp(node, endValue, {
          duration: 4,
          // suffix: '+',

          ...options
        });
        if (!countUp.error) {
          countUp.start();
        } else {
          console.error(countUp.error);
        }
      });
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                                 step wizard                                */
  /* -------------------------------------------------------------------------- */
  const createBoardInit = () => {
    const { getData } = window.phoenix.utils;
    const selectors = {
      CREATE_BOARD: '[data-create-board]',
      TOGGLE_BUTTON_EL: '[data-wizard-step]',
      FORMS: '[data-wizard-form]',
      PASSWORD_INPUT: '[data-wizard-password]',
      CONFIRM_PASSWORD_INPUT: '[data-wizard-confirm-password]',
      NEXT_BTN: '[data-wizard-next-btn]',
      PREV_BTN: '[data-wizard-prev-btn]',
      FOOTER: '[data-wizard-footer]',
      KANBAN_STEP: '[data-kanban-step]',
      BOARD_PREV_BTN: '[data-board-prev-btn]',
      CUSTOM_COLOR: '[data-custom-color-radio]'
    };
    // const ClassName = {
    //   KANBAN_PROGRESSBAR: 'theme-wizard-progress'
    // };

    const events = {
      SUBMIT: 'submit',
      SHOW: 'show.bs.tab',
      SHOWN: 'shown.bs.tab',
      CLICK: 'click',
      CHANGE: 'change'
    };

    const createBoard = document.querySelector(selectors.CREATE_BOARD);
    if (createBoard) {
      const tabToggleButtonEl = createBoard.querySelectorAll(
        selectors.TOGGLE_BUTTON_EL
      );
      const tabs = Array.from(tabToggleButtonEl).map(item => {
        return window.bootstrap.Tab.getOrCreateInstance(item);
      });

      // previous button only for create board last step
      const boardPrevButton = document.querySelector(selectors.BOARD_PREV_BTN);
      boardPrevButton?.addEventListener(events.CLICK, () => {
        tabs[tabs.length - 2].show();
      });

      // update kanban step
      if (tabToggleButtonEl.length) {
        tabToggleButtonEl.forEach(item => {
          item.addEventListener(events.SHOW, () => {
            const step = getData(item, 'wizard-step');
            const kanbanStep = document.querySelector(selectors.KANBAN_STEP);
            if (kanbanStep) {
              kanbanStep.textContent = step;
            }
          });
        });
      }

      const forms = createBoard.querySelectorAll(selectors.FORMS);
      forms.forEach((form, index) => {
        form.addEventListener(events.SUBMIT, e => {
          e.preventDefault();
          const formData = new FormData(e.target);
          Object.fromEntries(formData.entries());
          if (index + 1 === forms.length) {
            window.location.reload();
          }
          return null;
        });
      });
      // custom color
      const colorPicker = document.querySelector('#customColorInput');
      colorPicker?.addEventListener(events.CHANGE, event => {
        const selectedColor = event.target.value;
        const customColorRadioBtn = document.querySelector(
          selectors.CUSTOM_COLOR
        );
        customColorRadioBtn.setAttribute('checked', 'checked');
        customColorRadioBtn.value = selectedColor;
      });
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                                  Detector                                  */
  /* -------------------------------------------------------------------------- */

  const detectorInit = () => {
    const { addClass } = window.phoenix.utils;
    const { is } = window;
    const html = document.querySelector('html');

    is.opera() && addClass(html, 'opera');
    is.mobile() && addClass(html, 'mobile');
    is.firefox() && addClass(html, 'firefox');
    is.safari() && addClass(html, 'safari');
    is.ios() && addClass(html, 'ios');
    is.iphone() && addClass(html, 'iphone');
    is.ipad() && addClass(html, 'ipad');
    is.ie() && addClass(html, 'ie');
    is.edge() && addClass(html, 'edge');
    is.chrome() && addClass(html, 'chrome');
    is.mac() && addClass(html, 'osx');
    is.windows() && addClass(html, 'windows');
    navigator.userAgent.match('CriOS') && addClass(html, 'chrome');
  };

  /* -------------------------------------------------------------------------- */
  /*                           Open dropdown on hover                           */
  /* -------------------------------------------------------------------------- */

  const dropdownOnHover = () => {
    const navbarArea = document.querySelector('[data-dropdown-on-hover]');

    if (navbarArea) {
      navbarArea.addEventListener('mouseover', e => {
        if (
          e.target?.className?.includes('dropdown-toggle') &&
          !e.target.parentNode.className.includes('dropdown-inside') &&
          window.innerWidth > 992
        ) {
          const dropdownInstance = new window.bootstrap.Dropdown(e.target);

          /* eslint-disable no-underscore-dangle */
          dropdownInstance._element.classList.add('show');
          dropdownInstance._menu.classList.add('show');
          dropdownInstance._menu.setAttribute('data-bs-popper', 'none');

          e.target.parentNode.addEventListener('mouseleave', () => {
            if (window.innerWidth > 992) {
              dropdownInstance.hide();
            }
          });
        }
      });
    }
  };

  /* eslint-disable */
  const { merge: merge$1 } = window._;

  /*-----------------------------------------------
  |   Dropzone
  -----------------------------------------------*/

  window.Dropzone ? (window.Dropzone.autoDiscover = false) : '';

  const dropzoneInit = () => {
    const { getData } = window.phoenix.utils;
    const Selector = {
      DROPZONE: '[data-dropzone]',
      DZ_ERROR_MESSAGE: '.dz-error-message',
      DZ_PREVIEW: '.dz-preview',
      DZ_PROGRESS: '.dz-preview .dz-preview-cover .dz-progress',
      DZ_PREVIEW_COVER: '.dz-preview .dz-preview-cover'
    };

    const ClassName = {
      DZ_FILE_PROCESSING: 'dz-file-processing',
      DZ_FILE_COMPLETE: 'dz-file-complete',
      DZ_COMPLETE: 'dz-complete',
      DZ_PROCESSING: 'dz-processing'
    };

    const DATA_KEY = {
      OPTIONS: 'options'
    };

    const Events = {
      ADDED_FILE: 'addedfile',
      REMOVED_FILE: 'removedfile',
      COMPLETE: 'complete'
    };

    const dropzones = document.querySelectorAll(Selector.DROPZONE);

    !!dropzones.length &&
      dropzones.forEach(item => {
        let userOptions = getData(item, DATA_KEY.OPTIONS);
        userOptions = userOptions ? userOptions : {};
        const data = userOptions.data ? userOptions.data : {};
        const options = merge$1(
          {
            url: '/assets/php/',
            addRemoveLinks: false,
            previewsContainer: item.querySelector(Selector.DZ_PREVIEW),
            previewTemplate: item.querySelector(Selector.DZ_PREVIEW).innerHTML,
            thumbnailWidth: null,
            thumbnailHeight: null,
            maxFilesize: 2,
            autoProcessQueue: false,
            filesizeBase: 1000,
            init: function init() {
              const thisDropzone = this;

              if (data.length) {
                data.forEach(v => {
                  const mockFile = { name: v.name, size: v.size };
                  thisDropzone.options.addedfile.call(thisDropzone, mockFile);
                  thisDropzone.options.thumbnail.call(
                    thisDropzone,
                    mockFile,
                    `${v.url}/${v.name}`
                  );
                });
              }

              thisDropzone.on(Events.ADDED_FILE, function addedfile() {
                if ('maxFiles' in userOptions) {
                  if (
                    userOptions.maxFiles === 1 &&
                    item.querySelectorAll(Selector.DZ_PREVIEW_COVER).length > 1
                  ) {
                    item.querySelector(Selector.DZ_PREVIEW_COVER).remove();
                  }
                  if (userOptions.maxFiles === 1 && this.files.length > 1) {
                    this.removeFile(this.files[0]);
                  }
                }
              });
            },
            error(file, message) {
              if (file.previewElement) {
                file.previewElement.classList.add('dz-error');
                if (typeof message !== 'string' && message.error) {
                  message = message.error;
                }
                for (let node of file.previewElement.querySelectorAll(
                  '[data-dz-errormessage]'
                )) {
                  node.textContent = message;
                }
              }
            }
          },
          userOptions
        );
        // eslint-disable-next-line
        item.querySelector(Selector.DZ_PREVIEW).innerHTML = '';

        const dropzone = new window.Dropzone(item, options);

        dropzone.on(Events.ADDED_FILE, () => {
          if (item.querySelector(Selector.DZ_PREVIEW_COVER)) {
            item
              .querySelector(Selector.DZ_PREVIEW_COVER)
              .classList.remove(ClassName.DZ_FILE_COMPLETE);
          }
          item.classList.add(ClassName.DZ_FILE_PROCESSING);
        });
        dropzone.on(Events.REMOVED_FILE, () => {
          if (item.querySelector(Selector.DZ_PREVIEW_COVER)) {
            item
              .querySelector(Selector.DZ_PREVIEW_COVER)
              .classList.remove(ClassName.DZ_PROCESSING);
          }
          item.classList.add(ClassName.DZ_FILE_COMPLETE);
        });
        dropzone.on(Events.COMPLETE, () => {
          if (item.querySelector(Selector.DZ_PREVIEW_COVER)) {
            item
              .querySelector(Selector.DZ_PREVIEW_COVER)
              .classList.remove(ClassName.DZ_PROCESSING);
          }

          item.classList.add(ClassName.DZ_FILE_COMPLETE);
        });
      });
  };

  // import feather from 'feather-icons';
  /* -------------------------------------------------------------------------- */
  /*                            Feather Icons                                   */
  /* -------------------------------------------------------------------------- */

  const featherIconsInit = () => {
    if (window.feather) {
      window.feather.replace({
        width: '16px',
        height: '16px'
      });
    }
  };

  var HOOKS = [
      "onChange",
      "onClose",
      "onDayCreate",
      "onDestroy",
      "onKeyDown",
      "onMonthChange",
      "onOpen",
      "onParseConfig",
      "onReady",
      "onValueUpdate",
      "onYearChange",
      "onPreCalendarPosition",
  ];
  var defaults = {
      _disable: [],
      allowInput: false,
      allowInvalidPreload: false,
      altFormat: "F j, Y",
      altInput: false,
      altInputClass: "form-control input",
      animate: typeof window === "object" &&
          window.navigator.userAgent.indexOf("MSIE") === -1,
      ariaDateFormat: "F j, Y",
      autoFillDefaultTime: true,
      clickOpens: true,
      closeOnSelect: true,
      conjunction: ", ",
      dateFormat: "Y-m-d",
      defaultHour: 12,
      defaultMinute: 0,
      defaultSeconds: 0,
      disable: [],
      disableMobile: false,
      enableSeconds: false,
      enableTime: false,
      errorHandler: function (err) {
          return typeof console !== "undefined" && console.warn(err);
      },
      getWeek: function (givenDate) {
          var date = new Date(givenDate.getTime());
          date.setHours(0, 0, 0, 0);
          date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
          var week1 = new Date(date.getFullYear(), 0, 4);
          return (1 +
              Math.round(((date.getTime() - week1.getTime()) / 86400000 -
                  3 +
                  ((week1.getDay() + 6) % 7)) /
                  7));
      },
      hourIncrement: 1,
      ignoredFocusElements: [],
      inline: false,
      locale: "default",
      minuteIncrement: 5,
      mode: "single",
      monthSelectorType: "dropdown",
      nextArrow: "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M13.207 8.472l-7.854 7.854-0.707-0.707 7.146-7.146-7.146-7.148 0.707-0.707 7.854 7.854z' /></svg>",
      noCalendar: false,
      now: new Date(),
      onChange: [],
      onClose: [],
      onDayCreate: [],
      onDestroy: [],
      onKeyDown: [],
      onMonthChange: [],
      onOpen: [],
      onParseConfig: [],
      onReady: [],
      onValueUpdate: [],
      onYearChange: [],
      onPreCalendarPosition: [],
      plugins: [],
      position: "auto",
      positionElement: undefined,
      prevArrow: "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M5.207 8.471l7.146 7.147-0.707 0.707-7.853-7.854 7.854-7.853 0.707 0.707-7.147 7.146z' /></svg>",
      shorthandCurrentMonth: false,
      showMonths: 1,
      static: false,
      time_24hr: false,
      weekNumbers: false,
      wrap: false,
  };

  var english = {
      weekdays: {
          shorthand: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          longhand: [
              "Sunday",
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
          ],
      },
      months: {
          shorthand: [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
          ],
          longhand: [
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
          ],
      },
      daysInMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      firstDayOfWeek: 0,
      ordinal: function (nth) {
          var s = nth % 100;
          if (s > 3 && s < 21)
              return "th";
          switch (s % 10) {
              case 1:
                  return "st";
              case 2:
                  return "nd";
              case 3:
                  return "rd";
              default:
                  return "th";
          }
      },
      rangeSeparator: " to ",
      weekAbbreviation: "Wk",
      scrollTitle: "Scroll to increment",
      toggleTitle: "Click to toggle",
      amPM: ["AM", "PM"],
      yearAriaLabel: "Year",
      monthAriaLabel: "Month",
      hourAriaLabel: "Hour",
      minuteAriaLabel: "Minute",
      time_24hr: false,
  };

  var pad = function (number, length) {
      if (length === void 0) { length = 2; }
      return ("000" + number).slice(length * -1);
  };
  var int = function (bool) { return (bool === true ? 1 : 0); };
  function debounce(fn, wait) {
      var t;
      return function () {
          var _this = this;
          var args = arguments;
          clearTimeout(t);
          t = setTimeout(function () { return fn.apply(_this, args); }, wait);
      };
  }
  var arrayify = function (obj) {
      return obj instanceof Array ? obj : [obj];
  };

  function toggleClass(elem, className, bool) {
      if (bool === true)
          return elem.classList.add(className);
      elem.classList.remove(className);
  }
  function createElement(tag, className, content) {
      var e = window.document.createElement(tag);
      className = className || "";
      content = content || "";
      e.className = className;
      if (content !== undefined)
          e.textContent = content;
      return e;
  }
  function clearNode(node) {
      while (node.firstChild)
          node.removeChild(node.firstChild);
  }
  function findParent(node, condition) {
      if (condition(node))
          return node;
      else if (node.parentNode)
          return findParent(node.parentNode, condition);
      return undefined;
  }
  function createNumberInput(inputClassName, opts) {
      var wrapper = createElement("div", "numInputWrapper"), numInput = createElement("input", "numInput " + inputClassName), arrowUp = createElement("span", "arrowUp"), arrowDown = createElement("span", "arrowDown");
      if (navigator.userAgent.indexOf("MSIE 9.0") === -1) {
          numInput.type = "number";
      }
      else {
          numInput.type = "text";
          numInput.pattern = "\\d*";
      }
      if (opts !== undefined)
          for (var key in opts)
              numInput.setAttribute(key, opts[key]);
      wrapper.appendChild(numInput);
      wrapper.appendChild(arrowUp);
      wrapper.appendChild(arrowDown);
      return wrapper;
  }
  function getEventTarget(event) {
      try {
          if (typeof event.composedPath === "function") {
              var path = event.composedPath();
              return path[0];
          }
          return event.target;
      }
      catch (error) {
          return event.target;
      }
  }

  var doNothing = function () { return undefined; };
  var monthToStr = function (monthNumber, shorthand, locale) { return locale.months[shorthand ? "shorthand" : "longhand"][monthNumber]; };
  var revFormat = {
      D: doNothing,
      F: function (dateObj, monthName, locale) {
          dateObj.setMonth(locale.months.longhand.indexOf(monthName));
      },
      G: function (dateObj, hour) {
          dateObj.setHours((dateObj.getHours() >= 12 ? 12 : 0) + parseFloat(hour));
      },
      H: function (dateObj, hour) {
          dateObj.setHours(parseFloat(hour));
      },
      J: function (dateObj, day) {
          dateObj.setDate(parseFloat(day));
      },
      K: function (dateObj, amPM, locale) {
          dateObj.setHours((dateObj.getHours() % 12) +
              12 * int(new RegExp(locale.amPM[1], "i").test(amPM)));
      },
      M: function (dateObj, shortMonth, locale) {
          dateObj.setMonth(locale.months.shorthand.indexOf(shortMonth));
      },
      S: function (dateObj, seconds) {
          dateObj.setSeconds(parseFloat(seconds));
      },
      U: function (_, unixSeconds) { return new Date(parseFloat(unixSeconds) * 1000); },
      W: function (dateObj, weekNum, locale) {
          var weekNumber = parseInt(weekNum);
          var date = new Date(dateObj.getFullYear(), 0, 2 + (weekNumber - 1) * 7, 0, 0, 0, 0);
          date.setDate(date.getDate() - date.getDay() + locale.firstDayOfWeek);
          return date;
      },
      Y: function (dateObj, year) {
          dateObj.setFullYear(parseFloat(year));
      },
      Z: function (_, ISODate) { return new Date(ISODate); },
      d: function (dateObj, day) {
          dateObj.setDate(parseFloat(day));
      },
      h: function (dateObj, hour) {
          dateObj.setHours((dateObj.getHours() >= 12 ? 12 : 0) + parseFloat(hour));
      },
      i: function (dateObj, minutes) {
          dateObj.setMinutes(parseFloat(minutes));
      },
      j: function (dateObj, day) {
          dateObj.setDate(parseFloat(day));
      },
      l: doNothing,
      m: function (dateObj, month) {
          dateObj.setMonth(parseFloat(month) - 1);
      },
      n: function (dateObj, month) {
          dateObj.setMonth(parseFloat(month) - 1);
      },
      s: function (dateObj, seconds) {
          dateObj.setSeconds(parseFloat(seconds));
      },
      u: function (_, unixMillSeconds) {
          return new Date(parseFloat(unixMillSeconds));
      },
      w: doNothing,
      y: function (dateObj, year) {
          dateObj.setFullYear(2000 + parseFloat(year));
      },
  };
  var tokenRegex = {
      D: "",
      F: "",
      G: "(\\d\\d|\\d)",
      H: "(\\d\\d|\\d)",
      J: "(\\d\\d|\\d)\\w+",
      K: "",
      M: "",
      S: "(\\d\\d|\\d)",
      U: "(.+)",
      W: "(\\d\\d|\\d)",
      Y: "(\\d{4})",
      Z: "(.+)",
      d: "(\\d\\d|\\d)",
      h: "(\\d\\d|\\d)",
      i: "(\\d\\d|\\d)",
      j: "(\\d\\d|\\d)",
      l: "",
      m: "(\\d\\d|\\d)",
      n: "(\\d\\d|\\d)",
      s: "(\\d\\d|\\d)",
      u: "(.+)",
      w: "(\\d\\d|\\d)",
      y: "(\\d{2})",
  };
  var formats = {
      Z: function (date) { return date.toISOString(); },
      D: function (date, locale, options) {
          return locale.weekdays.shorthand[formats.w(date, locale, options)];
      },
      F: function (date, locale, options) {
          return monthToStr(formats.n(date, locale, options) - 1, false, locale);
      },
      G: function (date, locale, options) {
          return pad(formats.h(date, locale, options));
      },
      H: function (date) { return pad(date.getHours()); },
      J: function (date, locale) {
          return locale.ordinal !== undefined
              ? date.getDate() + locale.ordinal(date.getDate())
              : date.getDate();
      },
      K: function (date, locale) { return locale.amPM[int(date.getHours() > 11)]; },
      M: function (date, locale) {
          return monthToStr(date.getMonth(), true, locale);
      },
      S: function (date) { return pad(date.getSeconds()); },
      U: function (date) { return date.getTime() / 1000; },
      W: function (date, _, options) {
          return options.getWeek(date);
      },
      Y: function (date) { return pad(date.getFullYear(), 4); },
      d: function (date) { return pad(date.getDate()); },
      h: function (date) { return (date.getHours() % 12 ? date.getHours() % 12 : 12); },
      i: function (date) { return pad(date.getMinutes()); },
      j: function (date) { return date.getDate(); },
      l: function (date, locale) {
          return locale.weekdays.longhand[date.getDay()];
      },
      m: function (date) { return pad(date.getMonth() + 1); },
      n: function (date) { return date.getMonth() + 1; },
      s: function (date) { return date.getSeconds(); },
      u: function (date) { return date.getTime(); },
      w: function (date) { return date.getDay(); },
      y: function (date) { return String(date.getFullYear()).substring(2); },
  };

  var createDateFormatter = function (_a) {
      var _b = _a.config, config = _b === void 0 ? defaults : _b, _c = _a.l10n, l10n = _c === void 0 ? english : _c, _d = _a.isMobile, isMobile = _d === void 0 ? false : _d;
      return function (dateObj, frmt, overrideLocale) {
          var locale = overrideLocale || l10n;
          if (config.formatDate !== undefined && !isMobile) {
              return config.formatDate(dateObj, frmt, locale);
          }
          return frmt
              .split("")
              .map(function (c, i, arr) {
              return formats[c] && arr[i - 1] !== "\\"
                  ? formats[c](dateObj, locale, config)
                  : c !== "\\"
                      ? c
                      : "";
          })
              .join("");
      };
  };
  var createDateParser = function (_a) {
      var _b = _a.config, config = _b === void 0 ? defaults : _b, _c = _a.l10n, l10n = _c === void 0 ? english : _c;
      return function (date, givenFormat, timeless, customLocale) {
          if (date !== 0 && !date)
              return undefined;
          var locale = customLocale || l10n;
          var parsedDate;
          var dateOrig = date;
          if (date instanceof Date)
              parsedDate = new Date(date.getTime());
          else if (typeof date !== "string" &&
              date.toFixed !== undefined)
              parsedDate = new Date(date);
          else if (typeof date === "string") {
              var format = givenFormat || (config || defaults).dateFormat;
              var datestr = String(date).trim();
              if (datestr === "today") {
                  parsedDate = new Date();
                  timeless = true;
              }
              else if (config && config.parseDate) {
                  parsedDate = config.parseDate(date, format);
              }
              else if (/Z$/.test(datestr) ||
                  /GMT$/.test(datestr)) {
                  parsedDate = new Date(date);
              }
              else {
                  var matched = void 0, ops = [];
                  for (var i = 0, matchIndex = 0, regexStr = ""; i < format.length; i++) {
                      var token = format[i];
                      var isBackSlash = token === "\\";
                      var escaped = format[i - 1] === "\\" || isBackSlash;
                      if (tokenRegex[token] && !escaped) {
                          regexStr += tokenRegex[token];
                          var match = new RegExp(regexStr).exec(date);
                          if (match && (matched = true)) {
                              ops[token !== "Y" ? "push" : "unshift"]({
                                  fn: revFormat[token],
                                  val: match[++matchIndex],
                              });
                          }
                      }
                      else if (!isBackSlash)
                          regexStr += ".";
                  }
                  parsedDate =
                      !config || !config.noCalendar
                          ? new Date(new Date().getFullYear(), 0, 1, 0, 0, 0, 0)
                          : new Date(new Date().setHours(0, 0, 0, 0));
                  ops.forEach(function (_a) {
                      var fn = _a.fn, val = _a.val;
                      return (parsedDate = fn(parsedDate, val, locale) || parsedDate);
                  });
                  parsedDate = matched ? parsedDate : undefined;
              }
          }
          if (!(parsedDate instanceof Date && !isNaN(parsedDate.getTime()))) {
              config.errorHandler(new Error("Invalid date provided: " + dateOrig));
              return undefined;
          }
          if (timeless === true)
              parsedDate.setHours(0, 0, 0, 0);
          return parsedDate;
      };
  };
  function compareDates(date1, date2, timeless) {
      if (timeless === void 0) { timeless = true; }
      if (timeless !== false) {
          return (new Date(date1.getTime()).setHours(0, 0, 0, 0) -
              new Date(date2.getTime()).setHours(0, 0, 0, 0));
      }
      return date1.getTime() - date2.getTime();
  }
  var isBetween = function (ts, ts1, ts2) {
      return ts > Math.min(ts1, ts2) && ts < Math.max(ts1, ts2);
  };
  var calculateSecondsSinceMidnight = function (hours, minutes, seconds) {
      return hours * 3600 + minutes * 60 + seconds;
  };
  var parseSeconds = function (secondsSinceMidnight) {
      var hours = Math.floor(secondsSinceMidnight / 3600), minutes = (secondsSinceMidnight - hours * 3600) / 60;
      return [hours, minutes, secondsSinceMidnight - hours * 3600 - minutes * 60];
  };
  var duration = {
      DAY: 86400000,
  };
  function getDefaultHours(config) {
      var hours = config.defaultHour;
      var minutes = config.defaultMinute;
      var seconds = config.defaultSeconds;
      if (config.minDate !== undefined) {
          var minHour = config.minDate.getHours();
          var minMinutes = config.minDate.getMinutes();
          var minSeconds = config.minDate.getSeconds();
          if (hours < minHour) {
              hours = minHour;
          }
          if (hours === minHour && minutes < minMinutes) {
              minutes = minMinutes;
          }
          if (hours === minHour && minutes === minMinutes && seconds < minSeconds)
              seconds = config.minDate.getSeconds();
      }
      if (config.maxDate !== undefined) {
          var maxHr = config.maxDate.getHours();
          var maxMinutes = config.maxDate.getMinutes();
          hours = Math.min(hours, maxHr);
          if (hours === maxHr)
              minutes = Math.min(maxMinutes, minutes);
          if (hours === maxHr && minutes === maxMinutes)
              seconds = config.maxDate.getSeconds();
      }
      return { hours: hours, minutes: minutes, seconds: seconds };
  }

  if (typeof Object.assign !== "function") {
      Object.assign = function (target) {
          var args = [];
          for (var _i = 1; _i < arguments.length; _i++) {
              args[_i - 1] = arguments[_i];
          }
          if (!target) {
              throw TypeError("Cannot convert undefined or null to object");
          }
          var _loop_1 = function (source) {
              if (source) {
                  Object.keys(source).forEach(function (key) { return (target[key] = source[key]); });
              }
          };
          for (var _a = 0, args_1 = args; _a < args_1.length; _a++) {
              var source = args_1[_a];
              _loop_1(source);
          }
          return target;
      };
  }

  var __assign = (undefined && undefined.__assign) || function () {
      __assign = Object.assign || function(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
              s = arguments[i];
              for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                  t[p] = s[p];
          }
          return t;
      };
      return __assign.apply(this, arguments);
  };
  var __spreadArrays = (undefined && undefined.__spreadArrays) || function () {
      for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
      for (var r = Array(s), k = 0, i = 0; i < il; i++)
          for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
              r[k] = a[j];
      return r;
  };
  var DEBOUNCED_CHANGE_MS = 300;
  function FlatpickrInstance(element, instanceConfig) {
      var self = {
          config: __assign(__assign({}, defaults), flatpickr.defaultConfig),
          l10n: english,
      };
      self.parseDate = createDateParser({ config: self.config, l10n: self.l10n });
      self._handlers = [];
      self.pluginElements = [];
      self.loadedPlugins = [];
      self._bind = bind;
      self._setHoursFromDate = setHoursFromDate;
      self._positionCalendar = positionCalendar;
      self.changeMonth = changeMonth;
      self.changeYear = changeYear;
      self.clear = clear;
      self.close = close;
      self.onMouseOver = onMouseOver;
      self._createElement = createElement;
      self.createDay = createDay;
      self.destroy = destroy;
      self.isEnabled = isEnabled;
      self.jumpToDate = jumpToDate;
      self.updateValue = updateValue;
      self.open = open;
      self.redraw = redraw;
      self.set = set;
      self.setDate = setDate;
      self.toggle = toggle;
      function setupHelperFunctions() {
          self.utils = {
              getDaysInMonth: function (month, yr) {
                  if (month === void 0) { month = self.currentMonth; }
                  if (yr === void 0) { yr = self.currentYear; }
                  if (month === 1 && ((yr % 4 === 0 && yr % 100 !== 0) || yr % 400 === 0))
                      return 29;
                  return self.l10n.daysInMonth[month];
              },
          };
      }
      function init() {
          self.element = self.input = element;
          self.isOpen = false;
          parseConfig();
          setupLocale();
          setupInputs();
          setupDates();
          setupHelperFunctions();
          if (!self.isMobile)
              build();
          bindEvents();
          if (self.selectedDates.length || self.config.noCalendar) {
              if (self.config.enableTime) {
                  setHoursFromDate(self.config.noCalendar ? self.latestSelectedDateObj : undefined);
              }
              updateValue(false);
          }
          setCalendarWidth();
          var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
          if (!self.isMobile && isSafari) {
              positionCalendar();
          }
          triggerEvent("onReady");
      }
      function getClosestActiveElement() {
          var _a;
          return (((_a = self.calendarContainer) === null || _a === void 0 ? void 0 : _a.getRootNode())
              .activeElement || document.activeElement);
      }
      function bindToInstance(fn) {
          return fn.bind(self);
      }
      function setCalendarWidth() {
          var config = self.config;
          if (config.weekNumbers === false && config.showMonths === 1) {
              return;
          }
          else if (config.noCalendar !== true) {
              window.requestAnimationFrame(function () {
                  if (self.calendarContainer !== undefined) {
                      self.calendarContainer.style.visibility = "hidden";
                      self.calendarContainer.style.display = "block";
                  }
                  if (self.daysContainer !== undefined) {
                      var daysWidth = (self.days.offsetWidth + 1) * config.showMonths;
                      self.daysContainer.style.width = daysWidth + "px";
                      self.calendarContainer.style.width =
                          daysWidth +
                              (self.weekWrapper !== undefined
                                  ? self.weekWrapper.offsetWidth
                                  : 0) +
                              "px";
                      self.calendarContainer.style.removeProperty("visibility");
                      self.calendarContainer.style.removeProperty("display");
                  }
              });
          }
      }
      function updateTime(e) {
          if (self.selectedDates.length === 0) {
              var defaultDate = self.config.minDate === undefined ||
                  compareDates(new Date(), self.config.minDate) >= 0
                  ? new Date()
                  : new Date(self.config.minDate.getTime());
              var defaults = getDefaultHours(self.config);
              defaultDate.setHours(defaults.hours, defaults.minutes, defaults.seconds, defaultDate.getMilliseconds());
              self.selectedDates = [defaultDate];
              self.latestSelectedDateObj = defaultDate;
          }
          if (e !== undefined && e.type !== "blur") {
              timeWrapper(e);
          }
          var prevValue = self._input.value;
          setHoursFromInputs();
          updateValue();
          if (self._input.value !== prevValue) {
              self._debouncedChange();
          }
      }
      function ampm2military(hour, amPM) {
          return (hour % 12) + 12 * int(amPM === self.l10n.amPM[1]);
      }
      function military2ampm(hour) {
          switch (hour % 24) {
              case 0:
              case 12:
                  return 12;
              default:
                  return hour % 12;
          }
      }
      function setHoursFromInputs() {
          if (self.hourElement === undefined || self.minuteElement === undefined)
              return;
          var hours = (parseInt(self.hourElement.value.slice(-2), 10) || 0) % 24, minutes = (parseInt(self.minuteElement.value, 10) || 0) % 60, seconds = self.secondElement !== undefined
              ? (parseInt(self.secondElement.value, 10) || 0) % 60
              : 0;
          if (self.amPM !== undefined) {
              hours = ampm2military(hours, self.amPM.textContent);
          }
          var limitMinHours = self.config.minTime !== undefined ||
              (self.config.minDate &&
                  self.minDateHasTime &&
                  self.latestSelectedDateObj &&
                  compareDates(self.latestSelectedDateObj, self.config.minDate, true) ===
                      0);
          var limitMaxHours = self.config.maxTime !== undefined ||
              (self.config.maxDate &&
                  self.maxDateHasTime &&
                  self.latestSelectedDateObj &&
                  compareDates(self.latestSelectedDateObj, self.config.maxDate, true) ===
                      0);
          if (self.config.maxTime !== undefined &&
              self.config.minTime !== undefined &&
              self.config.minTime > self.config.maxTime) {
              var minBound = calculateSecondsSinceMidnight(self.config.minTime.getHours(), self.config.minTime.getMinutes(), self.config.minTime.getSeconds());
              var maxBound = calculateSecondsSinceMidnight(self.config.maxTime.getHours(), self.config.maxTime.getMinutes(), self.config.maxTime.getSeconds());
              var currentTime = calculateSecondsSinceMidnight(hours, minutes, seconds);
              if (currentTime > maxBound && currentTime < minBound) {
                  var result = parseSeconds(minBound);
                  hours = result[0];
                  minutes = result[1];
                  seconds = result[2];
              }
          }
          else {
              if (limitMaxHours) {
                  var maxTime = self.config.maxTime !== undefined
                      ? self.config.maxTime
                      : self.config.maxDate;
                  hours = Math.min(hours, maxTime.getHours());
                  if (hours === maxTime.getHours())
                      minutes = Math.min(minutes, maxTime.getMinutes());
                  if (minutes === maxTime.getMinutes())
                      seconds = Math.min(seconds, maxTime.getSeconds());
              }
              if (limitMinHours) {
                  var minTime = self.config.minTime !== undefined
                      ? self.config.minTime
                      : self.config.minDate;
                  hours = Math.max(hours, minTime.getHours());
                  if (hours === minTime.getHours() && minutes < minTime.getMinutes())
                      minutes = minTime.getMinutes();
                  if (minutes === minTime.getMinutes())
                      seconds = Math.max(seconds, minTime.getSeconds());
              }
          }
          setHours(hours, minutes, seconds);
      }
      function setHoursFromDate(dateObj) {
          var date = dateObj || self.latestSelectedDateObj;
          if (date && date instanceof Date) {
              setHours(date.getHours(), date.getMinutes(), date.getSeconds());
          }
      }
      function setHours(hours, minutes, seconds) {
          if (self.latestSelectedDateObj !== undefined) {
              self.latestSelectedDateObj.setHours(hours % 24, minutes, seconds || 0, 0);
          }
          if (!self.hourElement || !self.minuteElement || self.isMobile)
              return;
          self.hourElement.value = pad(!self.config.time_24hr
              ? ((12 + hours) % 12) + 12 * int(hours % 12 === 0)
              : hours);
          self.minuteElement.value = pad(minutes);
          if (self.amPM !== undefined)
              self.amPM.textContent = self.l10n.amPM[int(hours >= 12)];
          if (self.secondElement !== undefined)
              self.secondElement.value = pad(seconds);
      }
      function onYearInput(event) {
          var eventTarget = getEventTarget(event);
          var year = parseInt(eventTarget.value) + (event.delta || 0);
          if (year / 1000 > 1 ||
              (event.key === "Enter" && !/[^\d]/.test(year.toString()))) {
              changeYear(year);
          }
      }
      function bind(element, event, handler, options) {
          if (event instanceof Array)
              return event.forEach(function (ev) { return bind(element, ev, handler, options); });
          if (element instanceof Array)
              return element.forEach(function (el) { return bind(el, event, handler, options); });
          element.addEventListener(event, handler, options);
          self._handlers.push({
              remove: function () { return element.removeEventListener(event, handler, options); },
          });
      }
      function triggerChange() {
          triggerEvent("onChange");
      }
      function bindEvents() {
          if (self.config.wrap) {
              ["open", "close", "toggle", "clear"].forEach(function (evt) {
                  Array.prototype.forEach.call(self.element.querySelectorAll("[data-" + evt + "]"), function (el) {
                      return bind(el, "click", self[evt]);
                  });
              });
          }
          if (self.isMobile) {
              setupMobile();
              return;
          }
          var debouncedResize = debounce(onResize, 50);
          self._debouncedChange = debounce(triggerChange, DEBOUNCED_CHANGE_MS);
          if (self.daysContainer && !/iPhone|iPad|iPod/i.test(navigator.userAgent))
              bind(self.daysContainer, "mouseover", function (e) {
                  if (self.config.mode === "range")
                      onMouseOver(getEventTarget(e));
              });
          bind(self._input, "keydown", onKeyDown);
          if (self.calendarContainer !== undefined) {
              bind(self.calendarContainer, "keydown", onKeyDown);
          }
          if (!self.config.inline && !self.config.static)
              bind(window, "resize", debouncedResize);
          if (window.ontouchstart !== undefined)
              bind(window.document, "touchstart", documentClick);
          else
              bind(window.document, "mousedown", documentClick);
          bind(window.document, "focus", documentClick, { capture: true });
          if (self.config.clickOpens === true) {
              bind(self._input, "focus", self.open);
              bind(self._input, "click", self.open);
          }
          if (self.daysContainer !== undefined) {
              bind(self.monthNav, "click", onMonthNavClick);
              bind(self.monthNav, ["keyup", "increment"], onYearInput);
              bind(self.daysContainer, "click", selectDate);
          }
          if (self.timeContainer !== undefined &&
              self.minuteElement !== undefined &&
              self.hourElement !== undefined) {
              var selText = function (e) {
                  return getEventTarget(e).select();
              };
              bind(self.timeContainer, ["increment"], updateTime);
              bind(self.timeContainer, "blur", updateTime, { capture: true });
              bind(self.timeContainer, "click", timeIncrement);
              bind([self.hourElement, self.minuteElement], ["focus", "click"], selText);
              if (self.secondElement !== undefined)
                  bind(self.secondElement, "focus", function () { return self.secondElement && self.secondElement.select(); });
              if (self.amPM !== undefined) {
                  bind(self.amPM, "click", function (e) {
                      updateTime(e);
                  });
              }
          }
          if (self.config.allowInput) {
              bind(self._input, "blur", onBlur);
          }
      }
      function jumpToDate(jumpDate, triggerChange) {
          var jumpTo = jumpDate !== undefined
              ? self.parseDate(jumpDate)
              : self.latestSelectedDateObj ||
                  (self.config.minDate && self.config.minDate > self.now
                      ? self.config.minDate
                      : self.config.maxDate && self.config.maxDate < self.now
                          ? self.config.maxDate
                          : self.now);
          var oldYear = self.currentYear;
          var oldMonth = self.currentMonth;
          try {
              if (jumpTo !== undefined) {
                  self.currentYear = jumpTo.getFullYear();
                  self.currentMonth = jumpTo.getMonth();
              }
          }
          catch (e) {
              e.message = "Invalid date supplied: " + jumpTo;
              self.config.errorHandler(e);
          }
          if (triggerChange && self.currentYear !== oldYear) {
              triggerEvent("onYearChange");
              buildMonthSwitch();
          }
          if (triggerChange &&
              (self.currentYear !== oldYear || self.currentMonth !== oldMonth)) {
              triggerEvent("onMonthChange");
          }
          self.redraw();
      }
      function timeIncrement(e) {
          var eventTarget = getEventTarget(e);
          if (~eventTarget.className.indexOf("arrow"))
              incrementNumInput(e, eventTarget.classList.contains("arrowUp") ? 1 : -1);
      }
      function incrementNumInput(e, delta, inputElem) {
          var target = e && getEventTarget(e);
          var input = inputElem ||
              (target && target.parentNode && target.parentNode.firstChild);
          var event = createEvent("increment");
          event.delta = delta;
          input && input.dispatchEvent(event);
      }
      function build() {
          var fragment = window.document.createDocumentFragment();
          self.calendarContainer = createElement("div", "flatpickr-calendar");
          self.calendarContainer.tabIndex = -1;
          if (!self.config.noCalendar) {
              fragment.appendChild(buildMonthNav());
              self.innerContainer = createElement("div", "flatpickr-innerContainer");
              if (self.config.weekNumbers) {
                  var _a = buildWeeks(), weekWrapper = _a.weekWrapper, weekNumbers = _a.weekNumbers;
                  self.innerContainer.appendChild(weekWrapper);
                  self.weekNumbers = weekNumbers;
                  self.weekWrapper = weekWrapper;
              }
              self.rContainer = createElement("div", "flatpickr-rContainer");
              self.rContainer.appendChild(buildWeekdays());
              if (!self.daysContainer) {
                  self.daysContainer = createElement("div", "flatpickr-days");
                  self.daysContainer.tabIndex = -1;
              }
              buildDays();
              self.rContainer.appendChild(self.daysContainer);
              self.innerContainer.appendChild(self.rContainer);
              fragment.appendChild(self.innerContainer);
          }
          if (self.config.enableTime) {
              fragment.appendChild(buildTime());
          }
          toggleClass(self.calendarContainer, "rangeMode", self.config.mode === "range");
          toggleClass(self.calendarContainer, "animate", self.config.animate === true);
          toggleClass(self.calendarContainer, "multiMonth", self.config.showMonths > 1);
          self.calendarContainer.appendChild(fragment);
          var customAppend = self.config.appendTo !== undefined &&
              self.config.appendTo.nodeType !== undefined;
          if (self.config.inline || self.config.static) {
              self.calendarContainer.classList.add(self.config.inline ? "inline" : "static");
              if (self.config.inline) {
                  if (!customAppend && self.element.parentNode)
                      self.element.parentNode.insertBefore(self.calendarContainer, self._input.nextSibling);
                  else if (self.config.appendTo !== undefined)
                      self.config.appendTo.appendChild(self.calendarContainer);
              }
              if (self.config.static) {
                  var wrapper = createElement("div", "flatpickr-wrapper");
                  if (self.element.parentNode)
                      self.element.parentNode.insertBefore(wrapper, self.element);
                  wrapper.appendChild(self.element);
                  if (self.altInput)
                      wrapper.appendChild(self.altInput);
                  wrapper.appendChild(self.calendarContainer);
              }
          }
          if (!self.config.static && !self.config.inline)
              (self.config.appendTo !== undefined
                  ? self.config.appendTo
                  : window.document.body).appendChild(self.calendarContainer);
      }
      function createDay(className, date, _dayNumber, i) {
          var dateIsEnabled = isEnabled(date, true), dayElement = createElement("span", className, date.getDate().toString());
          dayElement.dateObj = date;
          dayElement.$i = i;
          dayElement.setAttribute("aria-label", self.formatDate(date, self.config.ariaDateFormat));
          if (className.indexOf("hidden") === -1 &&
              compareDates(date, self.now) === 0) {
              self.todayDateElem = dayElement;
              dayElement.classList.add("today");
              dayElement.setAttribute("aria-current", "date");
          }
          if (dateIsEnabled) {
              dayElement.tabIndex = -1;
              if (isDateSelected(date)) {
                  dayElement.classList.add("selected");
                  self.selectedDateElem = dayElement;
                  if (self.config.mode === "range") {
                      toggleClass(dayElement, "startRange", self.selectedDates[0] &&
                          compareDates(date, self.selectedDates[0], true) === 0);
                      toggleClass(dayElement, "endRange", self.selectedDates[1] &&
                          compareDates(date, self.selectedDates[1], true) === 0);
                      if (className === "nextMonthDay")
                          dayElement.classList.add("inRange");
                  }
              }
          }
          else {
              dayElement.classList.add("flatpickr-disabled");
          }
          if (self.config.mode === "range") {
              if (isDateInRange(date) && !isDateSelected(date))
                  dayElement.classList.add("inRange");
          }
          if (self.weekNumbers &&
              self.config.showMonths === 1 &&
              className !== "prevMonthDay" &&
              i % 7 === 6) {
              self.weekNumbers.insertAdjacentHTML("beforeend", "<span class='flatpickr-day'>" + self.config.getWeek(date) + "</span>");
          }
          triggerEvent("onDayCreate", dayElement);
          return dayElement;
      }
      function focusOnDayElem(targetNode) {
          targetNode.focus();
          if (self.config.mode === "range")
              onMouseOver(targetNode);
      }
      function getFirstAvailableDay(delta) {
          var startMonth = delta > 0 ? 0 : self.config.showMonths - 1;
          var endMonth = delta > 0 ? self.config.showMonths : -1;
          for (var m = startMonth; m != endMonth; m += delta) {
              var month = self.daysContainer.children[m];
              var startIndex = delta > 0 ? 0 : month.children.length - 1;
              var endIndex = delta > 0 ? month.children.length : -1;
              for (var i = startIndex; i != endIndex; i += delta) {
                  var c = month.children[i];
                  if (c.className.indexOf("hidden") === -1 && isEnabled(c.dateObj))
                      return c;
              }
          }
          return undefined;
      }
      function getNextAvailableDay(current, delta) {
          var givenMonth = current.className.indexOf("Month") === -1
              ? current.dateObj.getMonth()
              : self.currentMonth;
          var endMonth = delta > 0 ? self.config.showMonths : -1;
          var loopDelta = delta > 0 ? 1 : -1;
          for (var m = givenMonth - self.currentMonth; m != endMonth; m += loopDelta) {
              var month = self.daysContainer.children[m];
              var startIndex = givenMonth - self.currentMonth === m
                  ? current.$i + delta
                  : delta < 0
                      ? month.children.length - 1
                      : 0;
              var numMonthDays = month.children.length;
              for (var i = startIndex; i >= 0 && i < numMonthDays && i != (delta > 0 ? numMonthDays : -1); i += loopDelta) {
                  var c = month.children[i];
                  if (c.className.indexOf("hidden") === -1 &&
                      isEnabled(c.dateObj) &&
                      Math.abs(current.$i - i) >= Math.abs(delta))
                      return focusOnDayElem(c);
              }
          }
          self.changeMonth(loopDelta);
          focusOnDay(getFirstAvailableDay(loopDelta), 0);
          return undefined;
      }
      function focusOnDay(current, offset) {
          var activeElement = getClosestActiveElement();
          var dayFocused = isInView(activeElement || document.body);
          var startElem = current !== undefined
              ? current
              : dayFocused
                  ? activeElement
                  : self.selectedDateElem !== undefined && isInView(self.selectedDateElem)
                      ? self.selectedDateElem
                      : self.todayDateElem !== undefined && isInView(self.todayDateElem)
                          ? self.todayDateElem
                          : getFirstAvailableDay(offset > 0 ? 1 : -1);
          if (startElem === undefined) {
              self._input.focus();
          }
          else if (!dayFocused) {
              focusOnDayElem(startElem);
          }
          else {
              getNextAvailableDay(startElem, offset);
          }
      }
      function buildMonthDays(year, month) {
          var firstOfMonth = (new Date(year, month, 1).getDay() - self.l10n.firstDayOfWeek + 7) % 7;
          var prevMonthDays = self.utils.getDaysInMonth((month - 1 + 12) % 12, year);
          var daysInMonth = self.utils.getDaysInMonth(month, year), days = window.document.createDocumentFragment(), isMultiMonth = self.config.showMonths > 1, prevMonthDayClass = isMultiMonth ? "prevMonthDay hidden" : "prevMonthDay", nextMonthDayClass = isMultiMonth ? "nextMonthDay hidden" : "nextMonthDay";
          var dayNumber = prevMonthDays + 1 - firstOfMonth, dayIndex = 0;
          for (; dayNumber <= prevMonthDays; dayNumber++, dayIndex++) {
              days.appendChild(createDay("flatpickr-day " + prevMonthDayClass, new Date(year, month - 1, dayNumber), dayNumber, dayIndex));
          }
          for (dayNumber = 1; dayNumber <= daysInMonth; dayNumber++, dayIndex++) {
              days.appendChild(createDay("flatpickr-day", new Date(year, month, dayNumber), dayNumber, dayIndex));
          }
          for (var dayNum = daysInMonth + 1; dayNum <= 42 - firstOfMonth &&
              (self.config.showMonths === 1 || dayIndex % 7 !== 0); dayNum++, dayIndex++) {
              days.appendChild(createDay("flatpickr-day " + nextMonthDayClass, new Date(year, month + 1, dayNum % daysInMonth), dayNum, dayIndex));
          }
          var dayContainer = createElement("div", "dayContainer");
          dayContainer.appendChild(days);
          return dayContainer;
      }
      function buildDays() {
          if (self.daysContainer === undefined) {
              return;
          }
          clearNode(self.daysContainer);
          if (self.weekNumbers)
              clearNode(self.weekNumbers);
          var frag = document.createDocumentFragment();
          for (var i = 0; i < self.config.showMonths; i++) {
              var d = new Date(self.currentYear, self.currentMonth, 1);
              d.setMonth(self.currentMonth + i);
              frag.appendChild(buildMonthDays(d.getFullYear(), d.getMonth()));
          }
          self.daysContainer.appendChild(frag);
          self.days = self.daysContainer.firstChild;
          if (self.config.mode === "range" && self.selectedDates.length === 1) {
              onMouseOver();
          }
      }
      function buildMonthSwitch() {
          if (self.config.showMonths > 1 ||
              self.config.monthSelectorType !== "dropdown")
              return;
          var shouldBuildMonth = function (month) {
              if (self.config.minDate !== undefined &&
                  self.currentYear === self.config.minDate.getFullYear() &&
                  month < self.config.minDate.getMonth()) {
                  return false;
              }
              return !(self.config.maxDate !== undefined &&
                  self.currentYear === self.config.maxDate.getFullYear() &&
                  month > self.config.maxDate.getMonth());
          };
          self.monthsDropdownContainer.tabIndex = -1;
          self.monthsDropdownContainer.innerHTML = "";
          for (var i = 0; i < 12; i++) {
              if (!shouldBuildMonth(i))
                  continue;
              var month = createElement("option", "flatpickr-monthDropdown-month");
              month.value = new Date(self.currentYear, i).getMonth().toString();
              month.textContent = monthToStr(i, self.config.shorthandCurrentMonth, self.l10n);
              month.tabIndex = -1;
              if (self.currentMonth === i) {
                  month.selected = true;
              }
              self.monthsDropdownContainer.appendChild(month);
          }
      }
      function buildMonth() {
          var container = createElement("div", "flatpickr-month");
          var monthNavFragment = window.document.createDocumentFragment();
          var monthElement;
          if (self.config.showMonths > 1 ||
              self.config.monthSelectorType === "static") {
              monthElement = createElement("span", "cur-month");
          }
          else {
              self.monthsDropdownContainer = createElement("select", "flatpickr-monthDropdown-months");
              self.monthsDropdownContainer.setAttribute("aria-label", self.l10n.monthAriaLabel);
              bind(self.monthsDropdownContainer, "change", function (e) {
                  var target = getEventTarget(e);
                  var selectedMonth = parseInt(target.value, 10);
                  self.changeMonth(selectedMonth - self.currentMonth);
                  triggerEvent("onMonthChange");
              });
              buildMonthSwitch();
              monthElement = self.monthsDropdownContainer;
          }
          var yearInput = createNumberInput("cur-year", { tabindex: "-1" });
          var yearElement = yearInput.getElementsByTagName("input")[0];
          yearElement.setAttribute("aria-label", self.l10n.yearAriaLabel);
          if (self.config.minDate) {
              yearElement.setAttribute("min", self.config.minDate.getFullYear().toString());
          }
          if (self.config.maxDate) {
              yearElement.setAttribute("max", self.config.maxDate.getFullYear().toString());
              yearElement.disabled =
                  !!self.config.minDate &&
                      self.config.minDate.getFullYear() === self.config.maxDate.getFullYear();
          }
          var currentMonth = createElement("div", "flatpickr-current-month");
          currentMonth.appendChild(monthElement);
          currentMonth.appendChild(yearInput);
          monthNavFragment.appendChild(currentMonth);
          container.appendChild(monthNavFragment);
          return {
              container: container,
              yearElement: yearElement,
              monthElement: monthElement,
          };
      }
      function buildMonths() {
          clearNode(self.monthNav);
          self.monthNav.appendChild(self.prevMonthNav);
          if (self.config.showMonths) {
              self.yearElements = [];
              self.monthElements = [];
          }
          for (var m = self.config.showMonths; m--;) {
              var month = buildMonth();
              self.yearElements.push(month.yearElement);
              self.monthElements.push(month.monthElement);
              self.monthNav.appendChild(month.container);
          }
          self.monthNav.appendChild(self.nextMonthNav);
      }
      function buildMonthNav() {
          self.monthNav = createElement("div", "flatpickr-months");
          self.yearElements = [];
          self.monthElements = [];
          self.prevMonthNav = createElement("span", "flatpickr-prev-month");
          self.prevMonthNav.innerHTML = self.config.prevArrow;
          self.nextMonthNav = createElement("span", "flatpickr-next-month");
          self.nextMonthNav.innerHTML = self.config.nextArrow;
          buildMonths();
          Object.defineProperty(self, "_hidePrevMonthArrow", {
              get: function () { return self.__hidePrevMonthArrow; },
              set: function (bool) {
                  if (self.__hidePrevMonthArrow !== bool) {
                      toggleClass(self.prevMonthNav, "flatpickr-disabled", bool);
                      self.__hidePrevMonthArrow = bool;
                  }
              },
          });
          Object.defineProperty(self, "_hideNextMonthArrow", {
              get: function () { return self.__hideNextMonthArrow; },
              set: function (bool) {
                  if (self.__hideNextMonthArrow !== bool) {
                      toggleClass(self.nextMonthNav, "flatpickr-disabled", bool);
                      self.__hideNextMonthArrow = bool;
                  }
              },
          });
          self.currentYearElement = self.yearElements[0];
          updateNavigationCurrentMonth();
          return self.monthNav;
      }
      function buildTime() {
          self.calendarContainer.classList.add("hasTime");
          if (self.config.noCalendar)
              self.calendarContainer.classList.add("noCalendar");
          var defaults = getDefaultHours(self.config);
          self.timeContainer = createElement("div", "flatpickr-time");
          self.timeContainer.tabIndex = -1;
          var separator = createElement("span", "flatpickr-time-separator", ":");
          var hourInput = createNumberInput("flatpickr-hour", {
              "aria-label": self.l10n.hourAriaLabel,
          });
          self.hourElement = hourInput.getElementsByTagName("input")[0];
          var minuteInput = createNumberInput("flatpickr-minute", {
              "aria-label": self.l10n.minuteAriaLabel,
          });
          self.minuteElement = minuteInput.getElementsByTagName("input")[0];
          self.hourElement.tabIndex = self.minuteElement.tabIndex = -1;
          self.hourElement.value = pad(self.latestSelectedDateObj
              ? self.latestSelectedDateObj.getHours()
              : self.config.time_24hr
                  ? defaults.hours
                  : military2ampm(defaults.hours));
          self.minuteElement.value = pad(self.latestSelectedDateObj
              ? self.latestSelectedDateObj.getMinutes()
              : defaults.minutes);
          self.hourElement.setAttribute("step", self.config.hourIncrement.toString());
          self.minuteElement.setAttribute("step", self.config.minuteIncrement.toString());
          self.hourElement.setAttribute("min", self.config.time_24hr ? "0" : "1");
          self.hourElement.setAttribute("max", self.config.time_24hr ? "23" : "12");
          self.hourElement.setAttribute("maxlength", "2");
          self.minuteElement.setAttribute("min", "0");
          self.minuteElement.setAttribute("max", "59");
          self.minuteElement.setAttribute("maxlength", "2");
          self.timeContainer.appendChild(hourInput);
          self.timeContainer.appendChild(separator);
          self.timeContainer.appendChild(minuteInput);
          if (self.config.time_24hr)
              self.timeContainer.classList.add("time24hr");
          if (self.config.enableSeconds) {
              self.timeContainer.classList.add("hasSeconds");
              var secondInput = createNumberInput("flatpickr-second");
              self.secondElement = secondInput.getElementsByTagName("input")[0];
              self.secondElement.value = pad(self.latestSelectedDateObj
                  ? self.latestSelectedDateObj.getSeconds()
                  : defaults.seconds);
              self.secondElement.setAttribute("step", self.minuteElement.getAttribute("step"));
              self.secondElement.setAttribute("min", "0");
              self.secondElement.setAttribute("max", "59");
              self.secondElement.setAttribute("maxlength", "2");
              self.timeContainer.appendChild(createElement("span", "flatpickr-time-separator", ":"));
              self.timeContainer.appendChild(secondInput);
          }
          if (!self.config.time_24hr) {
              self.amPM = createElement("span", "flatpickr-am-pm", self.l10n.amPM[int((self.latestSelectedDateObj
                  ? self.hourElement.value
                  : self.config.defaultHour) > 11)]);
              self.amPM.title = self.l10n.toggleTitle;
              self.amPM.tabIndex = -1;
              self.timeContainer.appendChild(self.amPM);
          }
          return self.timeContainer;
      }
      function buildWeekdays() {
          if (!self.weekdayContainer)
              self.weekdayContainer = createElement("div", "flatpickr-weekdays");
          else
              clearNode(self.weekdayContainer);
          for (var i = self.config.showMonths; i--;) {
              var container = createElement("div", "flatpickr-weekdaycontainer");
              self.weekdayContainer.appendChild(container);
          }
          updateWeekdays();
          return self.weekdayContainer;
      }
      function updateWeekdays() {
          if (!self.weekdayContainer) {
              return;
          }
          var firstDayOfWeek = self.l10n.firstDayOfWeek;
          var weekdays = __spreadArrays(self.l10n.weekdays.shorthand);
          if (firstDayOfWeek > 0 && firstDayOfWeek < weekdays.length) {
              weekdays = __spreadArrays(weekdays.splice(firstDayOfWeek, weekdays.length), weekdays.splice(0, firstDayOfWeek));
          }
          for (var i = self.config.showMonths; i--;) {
              self.weekdayContainer.children[i].innerHTML = "\n      <span class='flatpickr-weekday'>\n        " + weekdays.join("</span><span class='flatpickr-weekday'>") + "\n      </span>\n      ";
          }
      }
      function buildWeeks() {
          self.calendarContainer.classList.add("hasWeeks");
          var weekWrapper = createElement("div", "flatpickr-weekwrapper");
          weekWrapper.appendChild(createElement("span", "flatpickr-weekday", self.l10n.weekAbbreviation));
          var weekNumbers = createElement("div", "flatpickr-weeks");
          weekWrapper.appendChild(weekNumbers);
          return {
              weekWrapper: weekWrapper,
              weekNumbers: weekNumbers,
          };
      }
      function changeMonth(value, isOffset) {
          if (isOffset === void 0) { isOffset = true; }
          var delta = isOffset ? value : value - self.currentMonth;
          if ((delta < 0 && self._hidePrevMonthArrow === true) ||
              (delta > 0 && self._hideNextMonthArrow === true))
              return;
          self.currentMonth += delta;
          if (self.currentMonth < 0 || self.currentMonth > 11) {
              self.currentYear += self.currentMonth > 11 ? 1 : -1;
              self.currentMonth = (self.currentMonth + 12) % 12;
              triggerEvent("onYearChange");
              buildMonthSwitch();
          }
          buildDays();
          triggerEvent("onMonthChange");
          updateNavigationCurrentMonth();
      }
      function clear(triggerChangeEvent, toInitial) {
          if (triggerChangeEvent === void 0) { triggerChangeEvent = true; }
          if (toInitial === void 0) { toInitial = true; }
          self.input.value = "";
          if (self.altInput !== undefined)
              self.altInput.value = "";
          if (self.mobileInput !== undefined)
              self.mobileInput.value = "";
          self.selectedDates = [];
          self.latestSelectedDateObj = undefined;
          if (toInitial === true) {
              self.currentYear = self._initialDate.getFullYear();
              self.currentMonth = self._initialDate.getMonth();
          }
          if (self.config.enableTime === true) {
              var _a = getDefaultHours(self.config), hours = _a.hours, minutes = _a.minutes, seconds = _a.seconds;
              setHours(hours, minutes, seconds);
          }
          self.redraw();
          if (triggerChangeEvent)
              triggerEvent("onChange");
      }
      function close() {
          self.isOpen = false;
          if (!self.isMobile) {
              if (self.calendarContainer !== undefined) {
                  self.calendarContainer.classList.remove("open");
              }
              if (self._input !== undefined) {
                  self._input.classList.remove("active");
              }
          }
          triggerEvent("onClose");
      }
      function destroy() {
          if (self.config !== undefined)
              triggerEvent("onDestroy");
          for (var i = self._handlers.length; i--;) {
              self._handlers[i].remove();
          }
          self._handlers = [];
          if (self.mobileInput) {
              if (self.mobileInput.parentNode)
                  self.mobileInput.parentNode.removeChild(self.mobileInput);
              self.mobileInput = undefined;
          }
          else if (self.calendarContainer && self.calendarContainer.parentNode) {
              if (self.config.static && self.calendarContainer.parentNode) {
                  var wrapper = self.calendarContainer.parentNode;
                  wrapper.lastChild && wrapper.removeChild(wrapper.lastChild);
                  if (wrapper.parentNode) {
                      while (wrapper.firstChild)
                          wrapper.parentNode.insertBefore(wrapper.firstChild, wrapper);
                      wrapper.parentNode.removeChild(wrapper);
                  }
              }
              else
                  self.calendarContainer.parentNode.removeChild(self.calendarContainer);
          }
          if (self.altInput) {
              self.input.type = "text";
              if (self.altInput.parentNode)
                  self.altInput.parentNode.removeChild(self.altInput);
              delete self.altInput;
          }
          if (self.input) {
              self.input.type = self.input._type;
              self.input.classList.remove("flatpickr-input");
              self.input.removeAttribute("readonly");
          }
          [
              "_showTimeInput",
              "latestSelectedDateObj",
              "_hideNextMonthArrow",
              "_hidePrevMonthArrow",
              "__hideNextMonthArrow",
              "__hidePrevMonthArrow",
              "isMobile",
              "isOpen",
              "selectedDateElem",
              "minDateHasTime",
              "maxDateHasTime",
              "days",
              "daysContainer",
              "_input",
              "_positionElement",
              "innerContainer",
              "rContainer",
              "monthNav",
              "todayDateElem",
              "calendarContainer",
              "weekdayContainer",
              "prevMonthNav",
              "nextMonthNav",
              "monthsDropdownContainer",
              "currentMonthElement",
              "currentYearElement",
              "navigationCurrentMonth",
              "selectedDateElem",
              "config",
          ].forEach(function (k) {
              try {
                  delete self[k];
              }
              catch (_) { }
          });
      }
      function isCalendarElem(elem) {
          return self.calendarContainer.contains(elem);
      }
      function documentClick(e) {
          if (self.isOpen && !self.config.inline) {
              var eventTarget_1 = getEventTarget(e);
              var isCalendarElement = isCalendarElem(eventTarget_1);
              var isInput = eventTarget_1 === self.input ||
                  eventTarget_1 === self.altInput ||
                  self.element.contains(eventTarget_1) ||
                  (e.path &&
                      e.path.indexOf &&
                      (~e.path.indexOf(self.input) ||
                          ~e.path.indexOf(self.altInput)));
              var lostFocus = !isInput &&
                  !isCalendarElement &&
                  !isCalendarElem(e.relatedTarget);
              var isIgnored = !self.config.ignoredFocusElements.some(function (elem) {
                  return elem.contains(eventTarget_1);
              });
              if (lostFocus && isIgnored) {
                  if (self.config.allowInput) {
                      self.setDate(self._input.value, false, self.config.altInput
                          ? self.config.altFormat
                          : self.config.dateFormat);
                  }
                  if (self.timeContainer !== undefined &&
                      self.minuteElement !== undefined &&
                      self.hourElement !== undefined &&
                      self.input.value !== "" &&
                      self.input.value !== undefined) {
                      updateTime();
                  }
                  self.close();
                  if (self.config &&
                      self.config.mode === "range" &&
                      self.selectedDates.length === 1)
                      self.clear(false);
              }
          }
      }
      function changeYear(newYear) {
          if (!newYear ||
              (self.config.minDate && newYear < self.config.minDate.getFullYear()) ||
              (self.config.maxDate && newYear > self.config.maxDate.getFullYear()))
              return;
          var newYearNum = newYear, isNewYear = self.currentYear !== newYearNum;
          self.currentYear = newYearNum || self.currentYear;
          if (self.config.maxDate &&
              self.currentYear === self.config.maxDate.getFullYear()) {
              self.currentMonth = Math.min(self.config.maxDate.getMonth(), self.currentMonth);
          }
          else if (self.config.minDate &&
              self.currentYear === self.config.minDate.getFullYear()) {
              self.currentMonth = Math.max(self.config.minDate.getMonth(), self.currentMonth);
          }
          if (isNewYear) {
              self.redraw();
              triggerEvent("onYearChange");
              buildMonthSwitch();
          }
      }
      function isEnabled(date, timeless) {
          var _a;
          if (timeless === void 0) { timeless = true; }
          var dateToCheck = self.parseDate(date, undefined, timeless);
          if ((self.config.minDate &&
              dateToCheck &&
              compareDates(dateToCheck, self.config.minDate, timeless !== undefined ? timeless : !self.minDateHasTime) < 0) ||
              (self.config.maxDate &&
                  dateToCheck &&
                  compareDates(dateToCheck, self.config.maxDate, timeless !== undefined ? timeless : !self.maxDateHasTime) > 0))
              return false;
          if (!self.config.enable && self.config.disable.length === 0)
              return true;
          if (dateToCheck === undefined)
              return false;
          var bool = !!self.config.enable, array = (_a = self.config.enable) !== null && _a !== void 0 ? _a : self.config.disable;
          for (var i = 0, d = void 0; i < array.length; i++) {
              d = array[i];
              if (typeof d === "function" &&
                  d(dateToCheck))
                  return bool;
              else if (d instanceof Date &&
                  dateToCheck !== undefined &&
                  d.getTime() === dateToCheck.getTime())
                  return bool;
              else if (typeof d === "string") {
                  var parsed = self.parseDate(d, undefined, true);
                  return parsed && parsed.getTime() === dateToCheck.getTime()
                      ? bool
                      : !bool;
              }
              else if (typeof d === "object" &&
                  dateToCheck !== undefined &&
                  d.from &&
                  d.to &&
                  dateToCheck.getTime() >= d.from.getTime() &&
                  dateToCheck.getTime() <= d.to.getTime())
                  return bool;
          }
          return !bool;
      }
      function isInView(elem) {
          if (self.daysContainer !== undefined)
              return (elem.className.indexOf("hidden") === -1 &&
                  elem.className.indexOf("flatpickr-disabled") === -1 &&
                  self.daysContainer.contains(elem));
          return false;
      }
      function onBlur(e) {
          var isInput = e.target === self._input;
          var valueChanged = self._input.value.trimEnd() !== getDateStr();
          if (isInput &&
              valueChanged &&
              !(e.relatedTarget && isCalendarElem(e.relatedTarget))) {
              self.setDate(self._input.value, true, e.target === self.altInput
                  ? self.config.altFormat
                  : self.config.dateFormat);
          }
      }
      function onKeyDown(e) {
          var eventTarget = getEventTarget(e);
          var isInput = self.config.wrap
              ? element.contains(eventTarget)
              : eventTarget === self._input;
          var allowInput = self.config.allowInput;
          var allowKeydown = self.isOpen && (!allowInput || !isInput);
          var allowInlineKeydown = self.config.inline && isInput && !allowInput;
          if (e.keyCode === 13 && isInput) {
              if (allowInput) {
                  self.setDate(self._input.value, true, eventTarget === self.altInput
                      ? self.config.altFormat
                      : self.config.dateFormat);
                  self.close();
                  return eventTarget.blur();
              }
              else {
                  self.open();
              }
          }
          else if (isCalendarElem(eventTarget) ||
              allowKeydown ||
              allowInlineKeydown) {
              var isTimeObj = !!self.timeContainer &&
                  self.timeContainer.contains(eventTarget);
              switch (e.keyCode) {
                  case 13:
                      if (isTimeObj) {
                          e.preventDefault();
                          updateTime();
                          focusAndClose();
                      }
                      else
                          selectDate(e);
                      break;
                  case 27:
                      e.preventDefault();
                      focusAndClose();
                      break;
                  case 8:
                  case 46:
                      if (isInput && !self.config.allowInput) {
                          e.preventDefault();
                          self.clear();
                      }
                      break;
                  case 37:
                  case 39:
                      if (!isTimeObj && !isInput) {
                          e.preventDefault();
                          var activeElement = getClosestActiveElement();
                          if (self.daysContainer !== undefined &&
                              (allowInput === false ||
                                  (activeElement && isInView(activeElement)))) {
                              var delta_1 = e.keyCode === 39 ? 1 : -1;
                              if (!e.ctrlKey)
                                  focusOnDay(undefined, delta_1);
                              else {
                                  e.stopPropagation();
                                  changeMonth(delta_1);
                                  focusOnDay(getFirstAvailableDay(1), 0);
                              }
                          }
                      }
                      else if (self.hourElement)
                          self.hourElement.focus();
                      break;
                  case 38:
                  case 40:
                      e.preventDefault();
                      var delta = e.keyCode === 40 ? 1 : -1;
                      if ((self.daysContainer &&
                          eventTarget.$i !== undefined) ||
                          eventTarget === self.input ||
                          eventTarget === self.altInput) {
                          if (e.ctrlKey) {
                              e.stopPropagation();
                              changeYear(self.currentYear - delta);
                              focusOnDay(getFirstAvailableDay(1), 0);
                          }
                          else if (!isTimeObj)
                              focusOnDay(undefined, delta * 7);
                      }
                      else if (eventTarget === self.currentYearElement) {
                          changeYear(self.currentYear - delta);
                      }
                      else if (self.config.enableTime) {
                          if (!isTimeObj && self.hourElement)
                              self.hourElement.focus();
                          updateTime(e);
                          self._debouncedChange();
                      }
                      break;
                  case 9:
                      if (isTimeObj) {
                          var elems = [
                              self.hourElement,
                              self.minuteElement,
                              self.secondElement,
                              self.amPM,
                          ]
                              .concat(self.pluginElements)
                              .filter(function (x) { return x; });
                          var i = elems.indexOf(eventTarget);
                          if (i !== -1) {
                              var target = elems[i + (e.shiftKey ? -1 : 1)];
                              e.preventDefault();
                              (target || self._input).focus();
                          }
                      }
                      else if (!self.config.noCalendar &&
                          self.daysContainer &&
                          self.daysContainer.contains(eventTarget) &&
                          e.shiftKey) {
                          e.preventDefault();
                          self._input.focus();
                      }
                      break;
              }
          }
          if (self.amPM !== undefined && eventTarget === self.amPM) {
              switch (e.key) {
                  case self.l10n.amPM[0].charAt(0):
                  case self.l10n.amPM[0].charAt(0).toLowerCase():
                      self.amPM.textContent = self.l10n.amPM[0];
                      setHoursFromInputs();
                      updateValue();
                      break;
                  case self.l10n.amPM[1].charAt(0):
                  case self.l10n.amPM[1].charAt(0).toLowerCase():
                      self.amPM.textContent = self.l10n.amPM[1];
                      setHoursFromInputs();
                      updateValue();
                      break;
              }
          }
          if (isInput || isCalendarElem(eventTarget)) {
              triggerEvent("onKeyDown", e);
          }
      }
      function onMouseOver(elem, cellClass) {
          if (cellClass === void 0) { cellClass = "flatpickr-day"; }
          if (self.selectedDates.length !== 1 ||
              (elem &&
                  (!elem.classList.contains(cellClass) ||
                      elem.classList.contains("flatpickr-disabled"))))
              return;
          var hoverDate = elem
              ? elem.dateObj.getTime()
              : self.days.firstElementChild.dateObj.getTime(), initialDate = self.parseDate(self.selectedDates[0], undefined, true).getTime(), rangeStartDate = Math.min(hoverDate, self.selectedDates[0].getTime()), rangeEndDate = Math.max(hoverDate, self.selectedDates[0].getTime());
          var containsDisabled = false;
          var minRange = 0, maxRange = 0;
          for (var t = rangeStartDate; t < rangeEndDate; t += duration.DAY) {
              if (!isEnabled(new Date(t), true)) {
                  containsDisabled =
                      containsDisabled || (t > rangeStartDate && t < rangeEndDate);
                  if (t < initialDate && (!minRange || t > minRange))
                      minRange = t;
                  else if (t > initialDate && (!maxRange || t < maxRange))
                      maxRange = t;
              }
          }
          var hoverableCells = Array.from(self.rContainer.querySelectorAll("*:nth-child(-n+" + self.config.showMonths + ") > ." + cellClass));
          hoverableCells.forEach(function (dayElem) {
              var date = dayElem.dateObj;
              var timestamp = date.getTime();
              var outOfRange = (minRange > 0 && timestamp < minRange) ||
                  (maxRange > 0 && timestamp > maxRange);
              if (outOfRange) {
                  dayElem.classList.add("notAllowed");
                  ["inRange", "startRange", "endRange"].forEach(function (c) {
                      dayElem.classList.remove(c);
                  });
                  return;
              }
              else if (containsDisabled && !outOfRange)
                  return;
              ["startRange", "inRange", "endRange", "notAllowed"].forEach(function (c) {
                  dayElem.classList.remove(c);
              });
              if (elem !== undefined) {
                  elem.classList.add(hoverDate <= self.selectedDates[0].getTime()
                      ? "startRange"
                      : "endRange");
                  if (initialDate < hoverDate && timestamp === initialDate)
                      dayElem.classList.add("startRange");
                  else if (initialDate > hoverDate && timestamp === initialDate)
                      dayElem.classList.add("endRange");
                  if (timestamp >= minRange &&
                      (maxRange === 0 || timestamp <= maxRange) &&
                      isBetween(timestamp, initialDate, hoverDate))
                      dayElem.classList.add("inRange");
              }
          });
      }
      function onResize() {
          if (self.isOpen && !self.config.static && !self.config.inline)
              positionCalendar();
      }
      function open(e, positionElement) {
          if (positionElement === void 0) { positionElement = self._positionElement; }
          if (self.isMobile === true) {
              if (e) {
                  e.preventDefault();
                  var eventTarget = getEventTarget(e);
                  if (eventTarget) {
                      eventTarget.blur();
                  }
              }
              if (self.mobileInput !== undefined) {
                  self.mobileInput.focus();
                  self.mobileInput.click();
              }
              triggerEvent("onOpen");
              return;
          }
          else if (self._input.disabled || self.config.inline) {
              return;
          }
          var wasOpen = self.isOpen;
          self.isOpen = true;
          if (!wasOpen) {
              self.calendarContainer.classList.add("open");
              self._input.classList.add("active");
              triggerEvent("onOpen");
              positionCalendar(positionElement);
          }
          if (self.config.enableTime === true && self.config.noCalendar === true) {
              if (self.config.allowInput === false &&
                  (e === undefined ||
                      !self.timeContainer.contains(e.relatedTarget))) {
                  setTimeout(function () { return self.hourElement.select(); }, 50);
              }
          }
      }
      function minMaxDateSetter(type) {
          return function (date) {
              var dateObj = (self.config["_" + type + "Date"] = self.parseDate(date, self.config.dateFormat));
              var inverseDateObj = self.config["_" + (type === "min" ? "max" : "min") + "Date"];
              if (dateObj !== undefined) {
                  self[type === "min" ? "minDateHasTime" : "maxDateHasTime"] =
                      dateObj.getHours() > 0 ||
                          dateObj.getMinutes() > 0 ||
                          dateObj.getSeconds() > 0;
              }
              if (self.selectedDates) {
                  self.selectedDates = self.selectedDates.filter(function (d) { return isEnabled(d); });
                  if (!self.selectedDates.length && type === "min")
                      setHoursFromDate(dateObj);
                  updateValue();
              }
              if (self.daysContainer) {
                  redraw();
                  if (dateObj !== undefined)
                      self.currentYearElement[type] = dateObj.getFullYear().toString();
                  else
                      self.currentYearElement.removeAttribute(type);
                  self.currentYearElement.disabled =
                      !!inverseDateObj &&
                          dateObj !== undefined &&
                          inverseDateObj.getFullYear() === dateObj.getFullYear();
              }
          };
      }
      function parseConfig() {
          var boolOpts = [
              "wrap",
              "weekNumbers",
              "allowInput",
              "allowInvalidPreload",
              "clickOpens",
              "time_24hr",
              "enableTime",
              "noCalendar",
              "altInput",
              "shorthandCurrentMonth",
              "inline",
              "static",
              "enableSeconds",
              "disableMobile",
          ];
          var userConfig = __assign(__assign({}, JSON.parse(JSON.stringify(element.dataset || {}))), instanceConfig);
          var formats = {};
          self.config.parseDate = userConfig.parseDate;
          self.config.formatDate = userConfig.formatDate;
          Object.defineProperty(self.config, "enable", {
              get: function () { return self.config._enable; },
              set: function (dates) {
                  self.config._enable = parseDateRules(dates);
              },
          });
          Object.defineProperty(self.config, "disable", {
              get: function () { return self.config._disable; },
              set: function (dates) {
                  self.config._disable = parseDateRules(dates);
              },
          });
          var timeMode = userConfig.mode === "time";
          if (!userConfig.dateFormat && (userConfig.enableTime || timeMode)) {
              var defaultDateFormat = flatpickr.defaultConfig.dateFormat || defaults.dateFormat;
              formats.dateFormat =
                  userConfig.noCalendar || timeMode
                      ? "H:i" + (userConfig.enableSeconds ? ":S" : "")
                      : defaultDateFormat + " H:i" + (userConfig.enableSeconds ? ":S" : "");
          }
          if (userConfig.altInput &&
              (userConfig.enableTime || timeMode) &&
              !userConfig.altFormat) {
              var defaultAltFormat = flatpickr.defaultConfig.altFormat || defaults.altFormat;
              formats.altFormat =
                  userConfig.noCalendar || timeMode
                      ? "h:i" + (userConfig.enableSeconds ? ":S K" : " K")
                      : defaultAltFormat + (" h:i" + (userConfig.enableSeconds ? ":S" : "") + " K");
          }
          Object.defineProperty(self.config, "minDate", {
              get: function () { return self.config._minDate; },
              set: minMaxDateSetter("min"),
          });
          Object.defineProperty(self.config, "maxDate", {
              get: function () { return self.config._maxDate; },
              set: minMaxDateSetter("max"),
          });
          var minMaxTimeSetter = function (type) { return function (val) {
              self.config[type === "min" ? "_minTime" : "_maxTime"] = self.parseDate(val, "H:i:S");
          }; };
          Object.defineProperty(self.config, "minTime", {
              get: function () { return self.config._minTime; },
              set: minMaxTimeSetter("min"),
          });
          Object.defineProperty(self.config, "maxTime", {
              get: function () { return self.config._maxTime; },
              set: minMaxTimeSetter("max"),
          });
          if (userConfig.mode === "time") {
              self.config.noCalendar = true;
              self.config.enableTime = true;
          }
          Object.assign(self.config, formats, userConfig);
          for (var i = 0; i < boolOpts.length; i++)
              self.config[boolOpts[i]] =
                  self.config[boolOpts[i]] === true ||
                      self.config[boolOpts[i]] === "true";
          HOOKS.filter(function (hook) { return self.config[hook] !== undefined; }).forEach(function (hook) {
              self.config[hook] = arrayify(self.config[hook] || []).map(bindToInstance);
          });
          self.isMobile =
              !self.config.disableMobile &&
                  !self.config.inline &&
                  self.config.mode === "single" &&
                  !self.config.disable.length &&
                  !self.config.enable &&
                  !self.config.weekNumbers &&
                  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
          for (var i = 0; i < self.config.plugins.length; i++) {
              var pluginConf = self.config.plugins[i](self) || {};
              for (var key in pluginConf) {
                  if (HOOKS.indexOf(key) > -1) {
                      self.config[key] = arrayify(pluginConf[key])
                          .map(bindToInstance)
                          .concat(self.config[key]);
                  }
                  else if (typeof userConfig[key] === "undefined")
                      self.config[key] = pluginConf[key];
              }
          }
          if (!userConfig.altInputClass) {
              self.config.altInputClass =
                  getInputElem().className + " " + self.config.altInputClass;
          }
          triggerEvent("onParseConfig");
      }
      function getInputElem() {
          return self.config.wrap
              ? element.querySelector("[data-input]")
              : element;
      }
      function setupLocale() {
          if (typeof self.config.locale !== "object" &&
              typeof flatpickr.l10ns[self.config.locale] === "undefined")
              self.config.errorHandler(new Error("flatpickr: invalid locale " + self.config.locale));
          self.l10n = __assign(__assign({}, flatpickr.l10ns.default), (typeof self.config.locale === "object"
              ? self.config.locale
              : self.config.locale !== "default"
                  ? flatpickr.l10ns[self.config.locale]
                  : undefined));
          tokenRegex.D = "(" + self.l10n.weekdays.shorthand.join("|") + ")";
          tokenRegex.l = "(" + self.l10n.weekdays.longhand.join("|") + ")";
          tokenRegex.M = "(" + self.l10n.months.shorthand.join("|") + ")";
          tokenRegex.F = "(" + self.l10n.months.longhand.join("|") + ")";
          tokenRegex.K = "(" + self.l10n.amPM[0] + "|" + self.l10n.amPM[1] + "|" + self.l10n.amPM[0].toLowerCase() + "|" + self.l10n.amPM[1].toLowerCase() + ")";
          var userConfig = __assign(__assign({}, instanceConfig), JSON.parse(JSON.stringify(element.dataset || {})));
          if (userConfig.time_24hr === undefined &&
              flatpickr.defaultConfig.time_24hr === undefined) {
              self.config.time_24hr = self.l10n.time_24hr;
          }
          self.formatDate = createDateFormatter(self);
          self.parseDate = createDateParser({ config: self.config, l10n: self.l10n });
      }
      function positionCalendar(customPositionElement) {
          if (typeof self.config.position === "function") {
              return void self.config.position(self, customPositionElement);
          }
          if (self.calendarContainer === undefined)
              return;
          triggerEvent("onPreCalendarPosition");
          var positionElement = customPositionElement || self._positionElement;
          var calendarHeight = Array.prototype.reduce.call(self.calendarContainer.children, (function (acc, child) { return acc + child.offsetHeight; }), 0), calendarWidth = self.calendarContainer.offsetWidth, configPos = self.config.position.split(" "), configPosVertical = configPos[0], configPosHorizontal = configPos.length > 1 ? configPos[1] : null, inputBounds = positionElement.getBoundingClientRect(), distanceFromBottom = window.innerHeight - inputBounds.bottom, showOnTop = configPosVertical === "above" ||
              (configPosVertical !== "below" &&
                  distanceFromBottom < calendarHeight &&
                  inputBounds.top > calendarHeight);
          var top = window.pageYOffset +
              inputBounds.top +
              (!showOnTop ? positionElement.offsetHeight + 2 : -calendarHeight - 2);
          toggleClass(self.calendarContainer, "arrowTop", !showOnTop);
          toggleClass(self.calendarContainer, "arrowBottom", showOnTop);
          if (self.config.inline)
              return;
          var left = window.pageXOffset + inputBounds.left;
          var isCenter = false;
          var isRight = false;
          if (configPosHorizontal === "center") {
              left -= (calendarWidth - inputBounds.width) / 2;
              isCenter = true;
          }
          else if (configPosHorizontal === "right") {
              left -= calendarWidth - inputBounds.width;
              isRight = true;
          }
          toggleClass(self.calendarContainer, "arrowLeft", !isCenter && !isRight);
          toggleClass(self.calendarContainer, "arrowCenter", isCenter);
          toggleClass(self.calendarContainer, "arrowRight", isRight);
          var right = window.document.body.offsetWidth -
              (window.pageXOffset + inputBounds.right);
          var rightMost = left + calendarWidth > window.document.body.offsetWidth;
          var centerMost = right + calendarWidth > window.document.body.offsetWidth;
          toggleClass(self.calendarContainer, "rightMost", rightMost);
          if (self.config.static)
              return;
          self.calendarContainer.style.top = top + "px";
          if (!rightMost) {
              self.calendarContainer.style.left = left + "px";
              self.calendarContainer.style.right = "auto";
          }
          else if (!centerMost) {
              self.calendarContainer.style.left = "auto";
              self.calendarContainer.style.right = right + "px";
          }
          else {
              var doc = getDocumentStyleSheet();
              if (doc === undefined)
                  return;
              var bodyWidth = window.document.body.offsetWidth;
              var centerLeft = Math.max(0, bodyWidth / 2 - calendarWidth / 2);
              var centerBefore = ".flatpickr-calendar.centerMost:before";
              var centerAfter = ".flatpickr-calendar.centerMost:after";
              var centerIndex = doc.cssRules.length;
              var centerStyle = "{left:" + inputBounds.left + "px;right:auto;}";
              toggleClass(self.calendarContainer, "rightMost", false);
              toggleClass(self.calendarContainer, "centerMost", true);
              doc.insertRule(centerBefore + "," + centerAfter + centerStyle, centerIndex);
              self.calendarContainer.style.left = centerLeft + "px";
              self.calendarContainer.style.right = "auto";
          }
      }
      function getDocumentStyleSheet() {
          var editableSheet = null;
          for (var i = 0; i < document.styleSheets.length; i++) {
              var sheet = document.styleSheets[i];
              if (!sheet.cssRules)
                  continue;
              try {
                  sheet.cssRules;
              }
              catch (err) {
                  continue;
              }
              editableSheet = sheet;
              break;
          }
          return editableSheet != null ? editableSheet : createStyleSheet();
      }
      function createStyleSheet() {
          var style = document.createElement("style");
          document.head.appendChild(style);
          return style.sheet;
      }
      function redraw() {
          if (self.config.noCalendar || self.isMobile)
              return;
          buildMonthSwitch();
          updateNavigationCurrentMonth();
          buildDays();
      }
      function focusAndClose() {
          self._input.focus();
          if (window.navigator.userAgent.indexOf("MSIE") !== -1 ||
              navigator.msMaxTouchPoints !== undefined) {
              setTimeout(self.close, 0);
          }
          else {
              self.close();
          }
      }
      function selectDate(e) {
          e.preventDefault();
          e.stopPropagation();
          var isSelectable = function (day) {
              return day.classList &&
                  day.classList.contains("flatpickr-day") &&
                  !day.classList.contains("flatpickr-disabled") &&
                  !day.classList.contains("notAllowed");
          };
          var t = findParent(getEventTarget(e), isSelectable);
          if (t === undefined)
              return;
          var target = t;
          var selectedDate = (self.latestSelectedDateObj = new Date(target.dateObj.getTime()));
          var shouldChangeMonth = (selectedDate.getMonth() < self.currentMonth ||
              selectedDate.getMonth() >
                  self.currentMonth + self.config.showMonths - 1) &&
              self.config.mode !== "range";
          self.selectedDateElem = target;
          if (self.config.mode === "single")
              self.selectedDates = [selectedDate];
          else if (self.config.mode === "multiple") {
              var selectedIndex = isDateSelected(selectedDate);
              if (selectedIndex)
                  self.selectedDates.splice(parseInt(selectedIndex), 1);
              else
                  self.selectedDates.push(selectedDate);
          }
          else if (self.config.mode === "range") {
              if (self.selectedDates.length === 2) {
                  self.clear(false, false);
              }
              self.latestSelectedDateObj = selectedDate;
              self.selectedDates.push(selectedDate);
              if (compareDates(selectedDate, self.selectedDates[0], true) !== 0)
                  self.selectedDates.sort(function (a, b) { return a.getTime() - b.getTime(); });
          }
          setHoursFromInputs();
          if (shouldChangeMonth) {
              var isNewYear = self.currentYear !== selectedDate.getFullYear();
              self.currentYear = selectedDate.getFullYear();
              self.currentMonth = selectedDate.getMonth();
              if (isNewYear) {
                  triggerEvent("onYearChange");
                  buildMonthSwitch();
              }
              triggerEvent("onMonthChange");
          }
          updateNavigationCurrentMonth();
          buildDays();
          updateValue();
          if (!shouldChangeMonth &&
              self.config.mode !== "range" &&
              self.config.showMonths === 1)
              focusOnDayElem(target);
          else if (self.selectedDateElem !== undefined &&
              self.hourElement === undefined) {
              self.selectedDateElem && self.selectedDateElem.focus();
          }
          if (self.hourElement !== undefined)
              self.hourElement !== undefined && self.hourElement.focus();
          if (self.config.closeOnSelect) {
              var single = self.config.mode === "single" && !self.config.enableTime;
              var range = self.config.mode === "range" &&
                  self.selectedDates.length === 2 &&
                  !self.config.enableTime;
              if (single || range) {
                  focusAndClose();
              }
          }
          triggerChange();
      }
      var CALLBACKS = {
          locale: [setupLocale, updateWeekdays],
          showMonths: [buildMonths, setCalendarWidth, buildWeekdays],
          minDate: [jumpToDate],
          maxDate: [jumpToDate],
          positionElement: [updatePositionElement],
          clickOpens: [
              function () {
                  if (self.config.clickOpens === true) {
                      bind(self._input, "focus", self.open);
                      bind(self._input, "click", self.open);
                  }
                  else {
                      self._input.removeEventListener("focus", self.open);
                      self._input.removeEventListener("click", self.open);
                  }
              },
          ],
      };
      function set(option, value) {
          if (option !== null && typeof option === "object") {
              Object.assign(self.config, option);
              for (var key in option) {
                  if (CALLBACKS[key] !== undefined)
                      CALLBACKS[key].forEach(function (x) { return x(); });
              }
          }
          else {
              self.config[option] = value;
              if (CALLBACKS[option] !== undefined)
                  CALLBACKS[option].forEach(function (x) { return x(); });
              else if (HOOKS.indexOf(option) > -1)
                  self.config[option] = arrayify(value);
          }
          self.redraw();
          updateValue(true);
      }
      function setSelectedDate(inputDate, format) {
          var dates = [];
          if (inputDate instanceof Array)
              dates = inputDate.map(function (d) { return self.parseDate(d, format); });
          else if (inputDate instanceof Date || typeof inputDate === "number")
              dates = [self.parseDate(inputDate, format)];
          else if (typeof inputDate === "string") {
              switch (self.config.mode) {
                  case "single":
                  case "time":
                      dates = [self.parseDate(inputDate, format)];
                      break;
                  case "multiple":
                      dates = inputDate
                          .split(self.config.conjunction)
                          .map(function (date) { return self.parseDate(date, format); });
                      break;
                  case "range":
                      dates = inputDate
                          .split(self.l10n.rangeSeparator)
                          .map(function (date) { return self.parseDate(date, format); });
                      break;
              }
          }
          else
              self.config.errorHandler(new Error("Invalid date supplied: " + JSON.stringify(inputDate)));
          self.selectedDates = (self.config.allowInvalidPreload
              ? dates
              : dates.filter(function (d) { return d instanceof Date && isEnabled(d, false); }));
          if (self.config.mode === "range")
              self.selectedDates.sort(function (a, b) { return a.getTime() - b.getTime(); });
      }
      function setDate(date, triggerChange, format) {
          if (triggerChange === void 0) { triggerChange = false; }
          if (format === void 0) { format = self.config.dateFormat; }
          if ((date !== 0 && !date) || (date instanceof Array && date.length === 0))
              return self.clear(triggerChange);
          setSelectedDate(date, format);
          self.latestSelectedDateObj =
              self.selectedDates[self.selectedDates.length - 1];
          self.redraw();
          jumpToDate(undefined, triggerChange);
          setHoursFromDate();
          if (self.selectedDates.length === 0) {
              self.clear(false);
          }
          updateValue(triggerChange);
          if (triggerChange)
              triggerEvent("onChange");
      }
      function parseDateRules(arr) {
          return arr
              .slice()
              .map(function (rule) {
              if (typeof rule === "string" ||
                  typeof rule === "number" ||
                  rule instanceof Date) {
                  return self.parseDate(rule, undefined, true);
              }
              else if (rule &&
                  typeof rule === "object" &&
                  rule.from &&
                  rule.to)
                  return {
                      from: self.parseDate(rule.from, undefined),
                      to: self.parseDate(rule.to, undefined),
                  };
              return rule;
          })
              .filter(function (x) { return x; });
      }
      function setupDates() {
          self.selectedDates = [];
          self.now = self.parseDate(self.config.now) || new Date();
          var preloadedDate = self.config.defaultDate ||
              ((self.input.nodeName === "INPUT" ||
                  self.input.nodeName === "TEXTAREA") &&
                  self.input.placeholder &&
                  self.input.value === self.input.placeholder
                  ? null
                  : self.input.value);
          if (preloadedDate)
              setSelectedDate(preloadedDate, self.config.dateFormat);
          self._initialDate =
              self.selectedDates.length > 0
                  ? self.selectedDates[0]
                  : self.config.minDate &&
                      self.config.minDate.getTime() > self.now.getTime()
                      ? self.config.minDate
                      : self.config.maxDate &&
                          self.config.maxDate.getTime() < self.now.getTime()
                          ? self.config.maxDate
                          : self.now;
          self.currentYear = self._initialDate.getFullYear();
          self.currentMonth = self._initialDate.getMonth();
          if (self.selectedDates.length > 0)
              self.latestSelectedDateObj = self.selectedDates[0];
          if (self.config.minTime !== undefined)
              self.config.minTime = self.parseDate(self.config.minTime, "H:i");
          if (self.config.maxTime !== undefined)
              self.config.maxTime = self.parseDate(self.config.maxTime, "H:i");
          self.minDateHasTime =
              !!self.config.minDate &&
                  (self.config.minDate.getHours() > 0 ||
                      self.config.minDate.getMinutes() > 0 ||
                      self.config.minDate.getSeconds() > 0);
          self.maxDateHasTime =
              !!self.config.maxDate &&
                  (self.config.maxDate.getHours() > 0 ||
                      self.config.maxDate.getMinutes() > 0 ||
                      self.config.maxDate.getSeconds() > 0);
      }
      function setupInputs() {
          self.input = getInputElem();
          if (!self.input) {
              self.config.errorHandler(new Error("Invalid input element specified"));
              return;
          }
          self.input._type = self.input.type;
          self.input.type = "text";
          self.input.classList.add("flatpickr-input");
          self._input = self.input;
          if (self.config.altInput) {
              self.altInput = createElement(self.input.nodeName, self.config.altInputClass);
              self._input = self.altInput;
              self.altInput.placeholder = self.input.placeholder;
              self.altInput.disabled = self.input.disabled;
              self.altInput.required = self.input.required;
              self.altInput.tabIndex = self.input.tabIndex;
              self.altInput.type = "text";
              self.input.setAttribute("type", "hidden");
              if (!self.config.static && self.input.parentNode)
                  self.input.parentNode.insertBefore(self.altInput, self.input.nextSibling);
          }
          if (!self.config.allowInput)
              self._input.setAttribute("readonly", "readonly");
          updatePositionElement();
      }
      function updatePositionElement() {
          self._positionElement = self.config.positionElement || self._input;
      }
      function setupMobile() {
          var inputType = self.config.enableTime
              ? self.config.noCalendar
                  ? "time"
                  : "datetime-local"
              : "date";
          self.mobileInput = createElement("input", self.input.className + " flatpickr-mobile");
          self.mobileInput.tabIndex = 1;
          self.mobileInput.type = inputType;
          self.mobileInput.disabled = self.input.disabled;
          self.mobileInput.required = self.input.required;
          self.mobileInput.placeholder = self.input.placeholder;
          self.mobileFormatStr =
              inputType === "datetime-local"
                  ? "Y-m-d\\TH:i:S"
                  : inputType === "date"
                      ? "Y-m-d"
                      : "H:i:S";
          if (self.selectedDates.length > 0) {
              self.mobileInput.defaultValue = self.mobileInput.value = self.formatDate(self.selectedDates[0], self.mobileFormatStr);
          }
          if (self.config.minDate)
              self.mobileInput.min = self.formatDate(self.config.minDate, "Y-m-d");
          if (self.config.maxDate)
              self.mobileInput.max = self.formatDate(self.config.maxDate, "Y-m-d");
          if (self.input.getAttribute("step"))
              self.mobileInput.step = String(self.input.getAttribute("step"));
          self.input.type = "hidden";
          if (self.altInput !== undefined)
              self.altInput.type = "hidden";
          try {
              if (self.input.parentNode)
                  self.input.parentNode.insertBefore(self.mobileInput, self.input.nextSibling);
          }
          catch (_a) { }
          bind(self.mobileInput, "change", function (e) {
              self.setDate(getEventTarget(e).value, false, self.mobileFormatStr);
              triggerEvent("onChange");
              triggerEvent("onClose");
          });
      }
      function toggle(e) {
          if (self.isOpen === true)
              return self.close();
          self.open(e);
      }
      function triggerEvent(event, data) {
          if (self.config === undefined)
              return;
          var hooks = self.config[event];
          if (hooks !== undefined && hooks.length > 0) {
              for (var i = 0; hooks[i] && i < hooks.length; i++)
                  hooks[i](self.selectedDates, self.input.value, self, data);
          }
          if (event === "onChange") {
              self.input.dispatchEvent(createEvent("change"));
              self.input.dispatchEvent(createEvent("input"));
          }
      }
      function createEvent(name) {
          var e = document.createEvent("Event");
          e.initEvent(name, true, true);
          return e;
      }
      function isDateSelected(date) {
          for (var i = 0; i < self.selectedDates.length; i++) {
              var selectedDate = self.selectedDates[i];
              if (selectedDate instanceof Date &&
                  compareDates(selectedDate, date) === 0)
                  return "" + i;
          }
          return false;
      }
      function isDateInRange(date) {
          if (self.config.mode !== "range" || self.selectedDates.length < 2)
              return false;
          return (compareDates(date, self.selectedDates[0]) >= 0 &&
              compareDates(date, self.selectedDates[1]) <= 0);
      }
      function updateNavigationCurrentMonth() {
          if (self.config.noCalendar || self.isMobile || !self.monthNav)
              return;
          self.yearElements.forEach(function (yearElement, i) {
              var d = new Date(self.currentYear, self.currentMonth, 1);
              d.setMonth(self.currentMonth + i);
              if (self.config.showMonths > 1 ||
                  self.config.monthSelectorType === "static") {
                  self.monthElements[i].textContent =
                      monthToStr(d.getMonth(), self.config.shorthandCurrentMonth, self.l10n) + " ";
              }
              else {
                  self.monthsDropdownContainer.value = d.getMonth().toString();
              }
              yearElement.value = d.getFullYear().toString();
          });
          self._hidePrevMonthArrow =
              self.config.minDate !== undefined &&
                  (self.currentYear === self.config.minDate.getFullYear()
                      ? self.currentMonth <= self.config.minDate.getMonth()
                      : self.currentYear < self.config.minDate.getFullYear());
          self._hideNextMonthArrow =
              self.config.maxDate !== undefined &&
                  (self.currentYear === self.config.maxDate.getFullYear()
                      ? self.currentMonth + 1 > self.config.maxDate.getMonth()
                      : self.currentYear > self.config.maxDate.getFullYear());
      }
      function getDateStr(specificFormat) {
          var format = specificFormat ||
              (self.config.altInput ? self.config.altFormat : self.config.dateFormat);
          return self.selectedDates
              .map(function (dObj) { return self.formatDate(dObj, format); })
              .filter(function (d, i, arr) {
              return self.config.mode !== "range" ||
                  self.config.enableTime ||
                  arr.indexOf(d) === i;
          })
              .join(self.config.mode !== "range"
              ? self.config.conjunction
              : self.l10n.rangeSeparator);
      }
      function updateValue(triggerChange) {
          if (triggerChange === void 0) { triggerChange = true; }
          if (self.mobileInput !== undefined && self.mobileFormatStr) {
              self.mobileInput.value =
                  self.latestSelectedDateObj !== undefined
                      ? self.formatDate(self.latestSelectedDateObj, self.mobileFormatStr)
                      : "";
          }
          self.input.value = getDateStr(self.config.dateFormat);
          if (self.altInput !== undefined) {
              self.altInput.value = getDateStr(self.config.altFormat);
          }
          if (triggerChange !== false)
              triggerEvent("onValueUpdate");
      }
      function onMonthNavClick(e) {
          var eventTarget = getEventTarget(e);
          var isPrevMonth = self.prevMonthNav.contains(eventTarget);
          var isNextMonth = self.nextMonthNav.contains(eventTarget);
          if (isPrevMonth || isNextMonth) {
              changeMonth(isPrevMonth ? -1 : 1);
          }
          else if (self.yearElements.indexOf(eventTarget) >= 0) {
              eventTarget.select();
          }
          else if (eventTarget.classList.contains("arrowUp")) {
              self.changeYear(self.currentYear + 1);
          }
          else if (eventTarget.classList.contains("arrowDown")) {
              self.changeYear(self.currentYear - 1);
          }
      }
      function timeWrapper(e) {
          e.preventDefault();
          var isKeyDown = e.type === "keydown", eventTarget = getEventTarget(e), input = eventTarget;
          if (self.amPM !== undefined && eventTarget === self.amPM) {
              self.amPM.textContent =
                  self.l10n.amPM[int(self.amPM.textContent === self.l10n.amPM[0])];
          }
          var min = parseFloat(input.getAttribute("min")), max = parseFloat(input.getAttribute("max")), step = parseFloat(input.getAttribute("step")), curValue = parseInt(input.value, 10), delta = e.delta ||
              (isKeyDown ? (e.which === 38 ? 1 : -1) : 0);
          var newValue = curValue + step * delta;
          if (typeof input.value !== "undefined" && input.value.length === 2) {
              var isHourElem = input === self.hourElement, isMinuteElem = input === self.minuteElement;
              if (newValue < min) {
                  newValue =
                      max +
                          newValue +
                          int(!isHourElem) +
                          (int(isHourElem) && int(!self.amPM));
                  if (isMinuteElem)
                      incrementNumInput(undefined, -1, self.hourElement);
              }
              else if (newValue > max) {
                  newValue =
                      input === self.hourElement ? newValue - max - int(!self.amPM) : min;
                  if (isMinuteElem)
                      incrementNumInput(undefined, 1, self.hourElement);
              }
              if (self.amPM &&
                  isHourElem &&
                  (step === 1
                      ? newValue + curValue === 23
                      : Math.abs(newValue - curValue) > step)) {
                  self.amPM.textContent =
                      self.l10n.amPM[int(self.amPM.textContent === self.l10n.amPM[0])];
              }
              input.value = pad(newValue);
          }
      }
      init();
      return self;
  }
  function _flatpickr(nodeList, config) {
      var nodes = Array.prototype.slice
          .call(nodeList)
          .filter(function (x) { return x instanceof HTMLElement; });
      var instances = [];
      for (var i = 0; i < nodes.length; i++) {
          var node = nodes[i];
          try {
              if (node.getAttribute("data-fp-omit") !== null)
                  continue;
              if (node._flatpickr !== undefined) {
                  node._flatpickr.destroy();
                  node._flatpickr = undefined;
              }
              node._flatpickr = FlatpickrInstance(node, config || {});
              instances.push(node._flatpickr);
          }
          catch (e) {
              console.error(e);
          }
      }
      return instances.length === 1 ? instances[0] : instances;
  }
  if (typeof HTMLElement !== "undefined" &&
      typeof HTMLCollection !== "undefined" &&
      typeof NodeList !== "undefined") {
      HTMLCollection.prototype.flatpickr = NodeList.prototype.flatpickr = function (config) {
          return _flatpickr(this, config);
      };
      HTMLElement.prototype.flatpickr = function (config) {
          return _flatpickr([this], config);
      };
  }
  var flatpickr = function (selector, config) {
      if (typeof selector === "string") {
          return _flatpickr(window.document.querySelectorAll(selector), config);
      }
      else if (selector instanceof Node) {
          return _flatpickr([selector], config);
      }
      else {
          return _flatpickr(selector, config);
      }
  };
  flatpickr.defaultConfig = {};
  flatpickr.l10ns = {
      en: __assign({}, english),
      default: __assign({}, english),
  };
  flatpickr.localize = function (l10n) {
      flatpickr.l10ns.default = __assign(__assign({}, flatpickr.l10ns.default), l10n);
  };
  flatpickr.setDefaults = function (config) {
      flatpickr.defaultConfig = __assign(__assign({}, flatpickr.defaultConfig), config);
  };
  flatpickr.parseDate = createDateParser({});
  flatpickr.formatDate = createDateFormatter({});
  flatpickr.compareDates = compareDates;
  if (typeof jQuery !== "undefined" && typeof jQuery.fn !== "undefined") {
      jQuery.fn.flatpickr = function (config) {
          return _flatpickr(this, config);
      };
  }
  Date.prototype.fp_incr = function (days) {
      return new Date(this.getFullYear(), this.getMonth(), this.getDate() + (typeof days === "string" ? parseInt(days, 10) : days));
  };
  if (typeof window !== "undefined") {
      window.flatpickr = flatpickr;
  }

  // import {l10n} from

  /* -------------------------------------------------------------------------- */
  /*                                  Flatpickr                                 */
  /* -------------------------------------------------------------------------- */

  const flatpickrInit = () => {
    const { getData } = window.phoenix.utils;
    document.querySelectorAll('.datetimepicker').forEach(item => {
      const userOptions = getData(item, 'options');
      flatpickr(item, {
        nextArrow: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Pro 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M96 480c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L242.8 256L73.38 86.63c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l192 192c12.5 12.5 12.5 32.75 0 45.25l-192 192C112.4 476.9 104.2 480 96 480z"/></svg>`,
        prevArrow: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Pro 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M224 480c-8.188 0-16.38-3.125-22.62-9.375l-192-192c-12.5-12.5-12.5-32.75 0-45.25l192-192c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l169.4 169.4c12.5 12.5 12.5 32.75 0 45.25C240.4 476.9 232.2 480 224 480z"/></svg>`,
        locale: {
          firstDayOfWeek: 0,

          shorthand: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
        },
        monthSelectorType: 'static',
        onDayCreate: (dObj, dStr, fp, dayElem) => {
          if (dayElem.dateObj.getDay() === 5 || dayElem.dateObj.getDay() === 6) {
            dayElem.className += ' weekend-days';
          }
        },
        ...userOptions
      });

      // datepicker.l10n.weekdays.shorthand = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    });
  };

  /* -------------------------------------------------------------------------- */
  /*                              Form Validation                               */
  /* -------------------------------------------------------------------------- */

  const formValidationInit = () => {
    const forms = document.querySelectorAll('.needs-validation');

    forms.forEach(form => {
      form.addEventListener(
        'submit',
        event => {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add('was-validated');
        },
        false
      );
    });
  };

  /* -------------------------------------------------------------------------- */
  /*                                   Calendar                                 */

  /* -------------------------------------------------------------------------- */
  const renderCalendar = (el, option) => {
    const { merge } = window._;

    const options = merge(
      {
        initialView: 'dayGridMonth',
        editable: true,
        direction: document.querySelector('html').getAttribute('dir'),
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        buttonText: {
          month: 'Month',
          week: 'Week',
          day: 'Day'
        }
      },
      option
    );
    const calendar = new window.FullCalendar.Calendar(el, options);
    calendar.render();
    document
      .querySelector('.navbar-vertical-toggle')
      ?.addEventListener('navbar.vertical.toggle', () => calendar.updateSize());
    return calendar;
  };

  const fullCalendarInit = () => {
    const { getData } = window.phoenix.utils;

    const calendars = document.querySelectorAll('[data-calendar]');
    calendars.forEach(item => {
      const options = getData(item, 'calendar');
      renderCalendar(item, options);
    });
  };

  /* -------------------------------------------------------------------------- */
  /*                                 Glightbox                                */
  /* -------------------------------------------------------------------------- */

  const glightboxInit = () => {
    if (window.GLightbox) {
      window.GLightbox({
        selector: '[data-gallery]'
      });
    }
  };

  /*-----------------------------------------------
  |   Gooogle Map
  -----------------------------------------------*/

  function initMap() {
    const { getData } = window.phoenix.utils;
    const themeController = document.body;
    const $googlemaps = document.querySelectorAll('[data-googlemap]');
    if ($googlemaps.length && window.google) {
      const createControlBtn = (map, type) => {
        const controlButton = document.createElement('button');
        controlButton.classList.add(type);
        controlButton.innerHTML =
          type === 'zoomIn'
            ? '<span class="fas fa-plus text-black"></span>'
            : '<span class="fas fa-minus text-black"></span>';

        controlButton.addEventListener('click', () => {
          const zoom = map.getZoom();
          if (type === 'zoomIn') {
            map.setZoom(zoom + 1);
          }
          if (type === 'zoomOut') {
            map.setZoom(zoom - 1);
          }
        });

        return controlButton;
      };
      const mapStyles = {
        SnazzyCustomLight: [
          {
            featureType: 'administrative',
            elementType: 'all',
            stylers: [
              {
                visibility: 'off'
              }
            ]
          },
          {
            featureType: 'administrative',
            elementType: 'labels',
            stylers: [
              {
                visibility: 'on'
              }
            ]
          },
          {
            featureType: 'administrative',
            elementType: 'labels.text.fill',
            stylers: [
              {
                color: '#525b75'
              }
            ]
          },
          {
            featureType: 'administrative',
            elementType: 'labels.text.stroke',
            stylers: [
              {
                visibility: 'off'
              }
            ]
          },
          {
            featureType: 'administrative',
            elementType: 'labels.icon',
            stylers: [
              {
                visibility: 'off'
              }
            ]
          },
          {
            featureType: 'administrative.country',
            elementType: 'geometry.stroke',
            stylers: [
              {
                visibility: 'on'
              },
              {
                color: '#ffffff'
              }
            ]
          },
          {
            featureType: 'administrative.province',
            elementType: 'geometry.stroke',
            stylers: [
              {
                visibility: 'off'
              }
            ]
          },
          {
            featureType: 'landscape',
            elementType: 'geometry',
            stylers: [
              {
                visibility: 'on'
              },
              {
                color: '#E3E6ED'
              }
            ]
          },
          {
            featureType: 'landscape.natural',
            elementType: 'labels',
            stylers: [
              {
                visibility: 'off'
              }
            ]
          },
          {
            featureType: 'poi',
            elementType: 'all',
            stylers: [
              {
                visibility: 'off'
              }
            ]
          },
          {
            featureType: 'road',
            elementType: 'all',
            stylers: [
              {
                color: '#eff2f6'
              }
            ]
          },
          {
            featureType: 'road',
            elementType: 'labels',
            stylers: [
              {
                visibility: 'off'
              }
            ]
          },
          {
            featureType: 'road.arterial',
            elementType: 'all',
            stylers: [
              {
                visibility: 'on'
              }
            ]
          },
          {
            featureType: 'road.arterial',
            elementType: 'geometry',
            stylers: [
              {
                visibility: 'on'
              },
              {
                color: '#eff2f6'
              }
            ]
          },
          {
            featureType: 'road.arterial',
            elementType: 'labels.text.fill',
            stylers: [
              {
                visibility: 'on'
              },
              {
                color: '#9fa6bc'
              }
            ]
          },
          {
            featureType: 'road.arterial',
            elementType: 'labels.text.stroke',
            stylers: [
              {
                visibility: 'off'
              }
            ]
          },
          {
            featureType: 'road.local',
            elementType: 'geometry.fill',
            stylers: [
              {
                visibility: 'on'
              },
              {
                color: '#eff2f6'
              }
            ]
          },
          {
            featureType: 'road.local',
            elementType: 'labels.text.fill',
            stylers: [
              {
                visibility: 'on'
              },
              {
                color: '#9fa6bc'
              }
            ]
          },
          {
            featureType: 'road.local',
            elementType: 'labels.text.stroke',
            stylers: [
              {
                visibility: 'off'
              }
            ]
          },
          {
            featureType: 'transit',
            elementType: 'labels.icon',
            stylers: [
              {
                visibility: 'off'
              }
            ]
          },
          {
            featureType: 'transit.line',
            elementType: 'geometry',
            stylers: [
              {
                visibility: 'off'
              }
            ]
          },
          {
            featureType: 'transit.line',
            elementType: 'labels.text',
            stylers: [
              {
                visibility: 'off'
              }
            ]
          },
          {
            featureType: 'transit.station.airport',
            elementType: 'geometry',
            stylers: [
              {
                visibility: 'off'
              }
            ]
          },
          {
            featureType: 'transit.station.airport',
            elementType: 'labels',
            stylers: [
              {
                visibility: 'off'
              }
            ]
          },
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [
              {
                color: '#F5F7FA'
              }
            ]
          },
          {
            featureType: 'water',
            elementType: 'labels',
            stylers: [
              {
                visibility: 'off'
              }
            ]
          }
        ],
        SnazzyCustomDark: [
          {
            featureType: 'administrative',
            elementType: 'all',
            stylers: [
              {
                visibility: 'off'
              }
            ]
          },
          {
            featureType: 'administrative',
            elementType: 'labels',
            stylers: [{ visibility: 'on' }]
          },
          {
            featureType: 'administrative',
            elementType: 'labels.text.fill',
            stylers: [
              {
                color: '#8a94ad'
              }
            ]
          },
          {
            featureType: 'administrative',
            elementType: 'labels.text.stroke',
            stylers: [
              {
                visibility: 'off'
              }
            ]
          },
          {
            featureType: 'administrative',
            elementType: 'labels.icon',
            stylers: [
              {
                visibility: 'off'
              }
            ]
          },
          {
            featureType: 'administrative.country',
            elementType: 'geometry.stroke',
            stylers: [
              { visibility: 'on' },
              {
                color: '#000000'
              }
            ]
          },
          {
            featureType: 'administrative.province',
            elementType: 'geometry.stroke',
            stylers: [{ visibility: 'off' }]
          },
          {
            featureType: 'landscape',
            elementType: 'geometry',
            stylers: [{ visibility: 'on' }, { color: '#222834' }]
          },
          {
            featureType: 'landscape.natural',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
          },
          {
            featureType: 'poi',
            elementType: 'all',
            stylers: [{ visibility: 'off' }]
          },
          {
            featureType: 'road',
            elementType: 'all',
            stylers: [{ color: '#141824' }]
          },
          {
            featureType: 'road',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
          },
          {
            featureType: 'road.arterial',
            elementType: 'all',
            stylers: [
              {
                visibility: 'on'
              }
            ]
          },
          {
            featureType: 'road.arterial',
            elementType: 'geometry',
            stylers: [
              {
                visibility: 'on'
              },
              {
                color: '#141824'
              }
            ]
          },
          {
            featureType: 'road.arterial',
            elementType: 'labels.text.fill',
            stylers: [
              {
                visibility: 'on'
              },
              {
                color: '#525b75'
              }
            ]
          },
          {
            featureType: 'road.arterial',
            elementType: 'labels.text.stroke',
            stylers: [
              {
                visibility: 'off'
              }
            ]
          },
          {
            featureType: 'road.local',
            elementType: 'geometry.fill',
            stylers: [
              {
                visibility: 'on'
              },
              {
                color: '#141824'
              }
            ]
          },
          {
            featureType: 'road.local',
            elementType: 'labels.text.fill',
            stylers: [
              {
                visibility: 'on'
              },
              {
                color: '#67718A'
              }
            ]
          },
          {
            featureType: 'road.local',
            elementType: 'labels.text.stroke',
            stylers: [
              {
                visibility: 'off'
              }
            ]
          },
          {
            featureType: 'transit',
            elementType: 'labels.icon',
            stylers: [{ visibility: 'off' }]
          },
          {
            featureType: 'transit.line',
            elementType: 'geometry',
            stylers: [{ visibility: 'off' }]
          },
          {
            featureType: 'transit.line',
            elementType: 'labels.text',
            stylers: [{ visibility: 'off' }]
          },
          {
            featureType: 'transit.station.airport',
            elementType: 'geometry',
            stylers: [{ visibility: 'off' }]
          },
          {
            featureType: 'transit.station.airport',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
          },
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{ color: '#0f111a' }]
          },
          {
            featureType: 'water',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
          }
        ]
      };

      $googlemaps.forEach(itm => {
        const latLng = getData(itm, 'latlng').split(',');
        const markerPopup = itm.innerHTML;
        const zoom = getData(itm, 'zoom');
        const mapElement = itm;
        const mapStyle = getData(itm, 'phoenixTheme');

        if (getData(itm, 'phoenixTheme') === 'streetview') {
          const pov = getData(itm, 'pov');
          const mapOptions = {
            position: { lat: Number(latLng[0]), lng: Number(latLng[1]) },
            pov,
            zoom,
            gestureHandling: 'none',
            scrollwheel: false
          };

          return new window.google.maps.StreetViewPanorama(
            mapElement,
            mapOptions
          );
        }

        const mapOptions = {
          zoom,
          minZoom: 1.2,
          clickableIcons: false,
          zoomControl: false,
          zoomControlOptions: {
            position: window.google.maps.ControlPosition.LEFT
          },
          scrollwheel: getData(itm, 'scrollwheel'),
          disableDefaultUI: true,
          center: new window.google.maps.LatLng(latLng[0], latLng[1]),
          styles:
            window.config.config.phoenixTheme === 'dark'
              ? mapStyles.SnazzyCustomDark
              : mapStyles[mapStyle || 'SnazzyCustomLight']
        };

        const map = new window.google.maps.Map(mapElement, mapOptions);
        const infoWindow = new window.google.maps.InfoWindow({
          content: markerPopup
        });

        // Create the DIV to hold the control.
        const controlDiv = document.createElement('div');
        controlDiv.classList.add('google-map-control-btn');
        // Create the control.
        const zoomInBtn = createControlBtn(map, 'zoomIn');
        const zoomOutBtn = createControlBtn(map, 'zoomOut');
        // Append the control to the DIV.
        controlDiv.appendChild(zoomInBtn);
        controlDiv.appendChild(zoomOutBtn);

        map.controls[window.google.maps.ControlPosition.LEFT].push(controlDiv);

        const marker = new window.google.maps.Marker({
          position: new window.google.maps.LatLng(latLng[0], latLng[1]),
          // icon,
          map
        });

        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });

        themeController &&
          themeController.addEventListener(
            'clickControl',
            ({ detail: { control, value } }) => {
              if (control === 'phoenixTheme') {
                map.set(
                  'styles',
                  value === 'dark'
                    ? mapStyles.SnazzyCustomDark
                    : mapStyles.SnazzyCustomLight
                );
              }
            }
          );

        // return null;
      });
    }
  }

  /* -------------------------------------------------------------------------- */
  /*                           Icon copy to clipboard                           */
  /* -------------------------------------------------------------------------- */

  const iconCopiedInit = () => {
    const iconList = document.getElementById('icon-list');
    const iconCopiedToast = document.getElementById('icon-copied-toast');
    const iconCopiedToastInstance = new window.bootstrap.Toast(iconCopiedToast);

    if (iconList) {
      iconList.addEventListener('click', e => {
        const el = e.target;
        if (el.tagName === 'INPUT') {
          el.select();
          el.setSelectionRange(0, 99999);
          document.execCommand('copy');
          iconCopiedToast.querySelector(
            '.toast-body'
          ).innerHTML = `<span class="fw-black">Copied:</span>  <code>${el.value}</code>`;
          iconCopiedToastInstance.show();
        }
      });
    }
  };

  /*-----------------------------------------------
  |                     Isotope
  -----------------------------------------------*/

  const isotopeInit = () => {
    const { getData } = window.phoenix.utils;
    const Selector = {
      ISOTOPE_ITEM: '.isotope-item',
      DATA_ISOTOPE: '[data-sl-isotope]',
      DATA_FILTER: '[data-filter]',
      DATA_FILER_NAV: '[data-filter-nav]'
    };

    const DATA_KEY = {
      ISOTOPE: 'sl-isotope'
    };
    const ClassName = {
      ACTIVE: 'active'
    };

    if (window.Isotope) {
      const masonryItems = document.querySelectorAll(Selector.DATA_ISOTOPE);
      masonryItems.length &&
        masonryItems.forEach(masonryItem => {
          window.imagesLoaded(masonryItem, () => {
            masonryItem.querySelectorAll(Selector.ISOTOPE_ITEM).forEach(item => {
              // eslint-disable-next-line
              item.style.visibility = 'visible';
            });

            const userOptions = getData(masonryItem, DATA_KEY.ISOTOPE);
            const defaultOptions = {
              itemSelector: Selector.ISOTOPE_ITEM,
              layoutMode: 'packery'
            };

            const options = window._.merge(defaultOptions, userOptions);
            const isotope = new window.Isotope(masonryItem, options);

            // --------- filter -----------------
            const filterElement = document.querySelector(Selector.DATA_FILER_NAV);
            filterElement?.addEventListener('click', function (e) {
              const item = e.target.dataset.filter;
              isotope.arrange({ filter: item });
              document.querySelectorAll(Selector.DATA_FILTER).forEach(el => {
                el.classList.remove(ClassName.ACTIVE);
              });
              e.target.classList.add(ClassName.ACTIVE);
            });
            // ---------- filter end ------------

            return isotope;
          });
        });
    }
  };

  /* eslint-disable no-unused-expressions */
  /* -------------------------------------------------------------------------- */
  /*                                 Data Table                                 */
  /* -------------------------------------------------------------------------- */
  /* eslint-disable no-param-reassign */
  const togglePaginationButtonDisable = (button, disabled) => {
    button.disabled = disabled;
    button.classList[disabled ? 'add' : 'remove']('disabled');
  };

  const listInit = () => {
    const { getData } = window.phoenix.utils;
    if (window.List) {
      const lists = document.querySelectorAll('[data-list]');

      if (lists.length) {
        lists.forEach(el => {
          const bulkSelect = el.querySelector('[data-bulk-select]');

          let options = getData(el, 'list');

          if (options.pagination) {
            options = {
              ...options,
              pagination: {
                item: `<li><button class='page' type='button'></button></li>`,
                ...options.pagination
              }
            };
          }

          const paginationButtonNext = el.querySelector(
            '[data-list-pagination="next"]'
          );
          const paginationButtonPrev = el.querySelector(
            '[data-list-pagination="prev"]'
          );
          const viewAll = el.querySelector('[data-list-view="*"]');
          const viewLess = el.querySelector('[data-list-view="less"]');
          const listInfo = el.querySelector('[data-list-info]');
          const listFilter = document.querySelector('[data-list-filter]');
          const list = new List(el, options);

          // ---------------------------------------

          let totalItem = list.items.length;
          const itemsPerPage = list.page;
          const btnDropdownClose = list.listContainer.querySelector('.btn-close');
          let pageQuantity = Math.ceil(list.size() / list.page);
          let pageCount = 1;
          let numberOfcurrentItems =
            (pageCount - 1) * Number(list.page) + list.visibleItems.length;
          let isSearching = false;

          btnDropdownClose &&
            btnDropdownClose.addEventListener('search.close', () => {
              list.fuzzySearch('');
            });

          const updateListControls = () => {
            listInfo &&
              (listInfo.innerHTML = `${list.i} to ${numberOfcurrentItems} <span class='text-600'> Items of </span>${totalItem}`);

            paginationButtonPrev &&
              togglePaginationButtonDisable(
                paginationButtonPrev,
                pageCount === 1 || pageCount === 0
              );
            paginationButtonNext &&
              togglePaginationButtonDisable(
                paginationButtonNext,
                pageCount === pageQuantity || pageCount === 0
              );

            if (pageCount > 1 && pageCount < pageQuantity) {
              togglePaginationButtonDisable(paginationButtonNext, false);
              togglePaginationButtonDisable(paginationButtonPrev, false);
            }
          };

          // List info
          updateListControls();

          if (paginationButtonNext) {
            paginationButtonNext.addEventListener('click', e => {
              e.preventDefault();
              pageCount += 1;
              const nextInitialIndex = list.i + itemsPerPage;
              nextInitialIndex <= list.size() &&
                list.show(nextInitialIndex, itemsPerPage);
            });
          }

          if (paginationButtonPrev) {
            paginationButtonPrev.addEventListener('click', e => {
              e.preventDefault();
              pageCount -= 1;
              const prevItem = list.i - itemsPerPage;
              prevItem > 0 && list.show(prevItem, itemsPerPage);
            });
          }

          const toggleViewBtn = () => {
            viewLess.classList.toggle('d-none');
            viewAll.classList.toggle('d-none');
          };

          if (viewAll) {
            viewAll.addEventListener('click', () => {
              list.show(1, totalItem);
              pageCount = 1;
              toggleViewBtn();
            });
          }
          if (viewLess) {
            viewLess.addEventListener('click', () => {
              list.show(1, itemsPerPage);
              pageCount = 1;
              toggleViewBtn();
            });
          }
          // numbering pagination
          if (options.pagination) {
            el.querySelector('.pagination').addEventListener('click', e => {
              if (e.target.classList[0] === 'page') {
                const pageNum = Number(e.target.getAttribute('data-i'));
                if (pageNum) {
                  list.show(itemsPerPage * (pageNum - 1) + 1, list.page);
                  pageCount = pageNum;
                }
              }
            });
          }
          // filter
          if (options.filter) {
            const { key } = options.filter;
            listFilter.addEventListener('change', e => {
              list.filter(item => {
                if (e.target.value === '') {
                  return true;
                }
                pageQuantity = Math.ceil(list.matchingItems.length / list.page);
                pageCount = 1;
                updateListControls();
                return item
                  .values()
                  [key].toLowerCase()
                  .includes(e.target.value.toLowerCase());
              });
            });
          }

          // bulk-select
          if (bulkSelect) {
            const bulkSelectInstance =
              window.phoenix.BulkSelect.getInstance(bulkSelect);
            bulkSelectInstance.attachRowNodes(
              list.items.map(item =>
                item.elm.querySelector('[data-bulk-select-row]')
              )
            );

            bulkSelect.addEventListener('change', () => {
              if (list) {
                if (bulkSelect.checked) {
                  list.items.forEach(item => {
                    item.elm.querySelector(
                      '[data-bulk-select-row]'
                    ).checked = true;
                  });
                } else {
                  list.items.forEach(item => {
                    item.elm.querySelector(
                      '[data-bulk-select-row]'
                    ).checked = false;
                  });
                }
              }
            });
          }

          list.on('searchStart', () => {
            isSearching = true;
          });
          list.on('searchComplete', () => {
            isSearching = false;
          });

          list.on('updated', item => {
            if (!list.matchingItems.length) {
              pageQuantity = Math.ceil(list.size() / list.page);
            } else {
              pageQuantity = Math.ceil(list.matchingItems.length / list.page);
            }
            numberOfcurrentItems =
              (pageCount - 1) * Number(list.page) + list.visibleItems.length;
            updateListControls();

            // -------search-----------
            if (isSearching) {
              if (list.matchingItems.length === 0) {
                pageCount = 0;
              } else {
                pageCount = 1;
              }
              totalItem = list.matchingItems.length;
              numberOfcurrentItems =
                (pageCount === 0 ? 1 : pageCount - 1) * Number(list.page) +
                list.visibleItems.length;

              updateListControls();
              listInfo &&
                (listInfo.innerHTML = `${
                list.matchingItems.length === 0 ? 0 : list.i
              } to ${
                list.matchingItems.length === 0 ? 0 : numberOfcurrentItems
              } <span class='text-600'> Items of </span>${
                list.matchingItems.length
              }`);
            }

            // -------fallback-----------
            const fallback =
              el.querySelector('.fallback') ||
              document.getElementById(options.fallback);

            if (fallback) {
              if (item.matchingItems.length === 0) {
                fallback.classList.remove('d-none');
              } else {
                fallback.classList.add('d-none');
              }
            }
          });
        });
      }
    }
  };

  const lottieInit = () => {
    const { getData } = window.phoenix.utils;
    const lotties = document.querySelectorAll('.lottie');
    if (lotties.length) {
      lotties.forEach(item => {
        const options = getData(item, 'options');
        window.bodymovin.loadAnimation({
          container: item,
          path: '../img/animated-icons/warning-light.json',
          renderer: 'svg',
          loop: true,
          autoplay: true,
          name: 'Hello World',
          ...options
        });
      });
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                               Modal                               */
  /* -------------------------------------------------------------------------- */

  const modalInit = () => {
    const $modals = document.querySelectorAll('[data-phoenix-modal]');

    if ($modals) {
      $modals.forEach(modal => {
        modal.addEventListener('shown.bs.modal', () => {
          const $autofocusEls = modal.querySelectorAll('[autofocus=autofocus]');
          $autofocusEls.forEach(el => {
            el.focus();
          });
        });
      });
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                             Navbar Combo Layout                            */
  /* -------------------------------------------------------------------------- */

  const navbarComboInit = () => {
    const { getBreakpoint, getData, addClass, hasClass, resize } =
      window.phoenix.utils;

    const Selector = {
      NAVBAR_VERTICAL: '.navbar-vertical',
      NAVBAR_TOP_COMBO: '[data-navbar-top="combo"]',
      COLLAPSE: '.collapse',
      DATA_MOVE_CONTAINER: '[data-move-container]',
      NAVBAR_NAV: '.navbar-nav',
      NAVBAR_VERTICAL_DIVIDER: '.navbar-vertical-divider'
    };

    const ClassName = {
      FLEX_COLUMN: 'flex-column'
    };

    const navbarVertical = document.querySelector(Selector.NAVBAR_VERTICAL);
    const navbarTopCombo = document.querySelector(Selector.NAVBAR_TOP_COMBO);

    const moveNavContent = windowWidth => {
      const navbarVerticalBreakpoint = getBreakpoint(navbarVertical);
      const navbarTopBreakpoint = getBreakpoint(navbarTopCombo);

      if (windowWidth < navbarTopBreakpoint) {
        const navbarCollapse = navbarTopCombo.querySelector(Selector.COLLAPSE);
        const navbarTopContent = navbarCollapse.innerHTML;

        if (navbarTopContent) {
          const targetID = getData(navbarTopCombo, 'move-target');
          const targetElement = document.querySelector(targetID);

          navbarCollapse.innerHTML = '';
          targetElement.insertAdjacentHTML(
            'afterend',
            `
            <div data-move-container class='move-container'>
              <div class='navbar-vertical-divider'>
                <hr class='navbar-vertical-hr' />
              </div>
              ${navbarTopContent}
            </div>
          `
          );

          if (navbarVerticalBreakpoint < navbarTopBreakpoint) {
            const navbarNav = document
              .querySelector(Selector.DATA_MOVE_CONTAINER)
              .querySelector(Selector.NAVBAR_NAV);
            addClass(navbarNav, ClassName.FLEX_COLUMN);
          }
        }
      } else {
        const moveableContainer = document.querySelector(
          Selector.DATA_MOVE_CONTAINER
        );
        if (moveableContainer) {
          const navbarNav = moveableContainer.querySelector(Selector.NAVBAR_NAV);
          hasClass(navbarNav, ClassName.FLEX_COLUMN) &&
            navbarNav.classList.remove(ClassName.FLEX_COLUMN);
          moveableContainer
            .querySelector(Selector.NAVBAR_VERTICAL_DIVIDER)
            .remove();
          navbarTopCombo.querySelector(Selector.COLLAPSE).innerHTML =
            moveableContainer.innerHTML;
          moveableContainer.remove();
        }
      }
    };

    moveNavContent(window.innerWidth);

    resize(() => moveNavContent(window.innerWidth));
  };

  const navbarShadowOnScrollInit = () => {
    const navbar = document.querySelector('[data-navbar-shadow-on-scroll]');
    if (navbar) {
      window.onscroll = () => {
        if (window.scrollY > 300) {
          navbar.classList.add('navbar-shadow');
        } else {
          navbar.classList.remove('navbar-shadow');
        }
      };
    }
  };

  const navbarInit = () => {
    const navbar = document.querySelector('[data-navbar-soft-on-scroll]');
    if (navbar) {
      const windowHeight = window.innerHeight;
      const handleAlpha = () => {
        const scrollTop = window.pageYOffset;
        let alpha = (scrollTop / windowHeight) * 2;
        alpha >= 1 && (alpha = 1);
        navbar.style.backgroundColor = `rgba(255, 255, 255, ${alpha})`;
      };
      handleAlpha();
      document.addEventListener('scroll', () => handleAlpha());
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                               Navbar Vertical                              */
  /* -------------------------------------------------------------------------- */

  const handleNavbarVerticalCollapsed = () => {
    const { getItemFromStore, setItemToStore, resize } = window.phoenix.utils;
    const Selector = {
      HTML: 'html',
      BODY: 'body',
      NAVBAR_VERTICAL: '.navbar-vertical',
      NAVBAR_VERTICAL_TOGGLE: '.navbar-vertical-toggle',
      NAVBAR_VERTICAL_COLLAPSE: '.navbar-vertical .navbar-collapse',
      ACTIVE_NAV_LINK: '.navbar-vertical .nav-link.active'
    };

    const Events = {
      CLICK: 'click',
      MOUSE_OVER: 'mouseover',
      MOUSE_LEAVE: 'mouseleave',
      NAVBAR_VERTICAL_TOGGLE: 'navbar.vertical.toggle'
    };
    const ClassNames = {
      NAVBAR_VERTICAL_COLLAPSED: 'navbar-vertical-collapsed'
    };
    const navbarVerticalToggle = document.querySelector(
      Selector.NAVBAR_VERTICAL_TOGGLE
    );
    // const html = document.querySelector(Selector.HTML);
    const navbarVerticalCollapse = document.querySelector(
      Selector.NAVBAR_VERTICAL_COLLAPSE
    );
    const activeNavLinkItem = document.querySelector(Selector.ACTIVE_NAV_LINK);
    const isNavbarVerticalCollapsed = getItemFromStore(
      'phoenixIsNavbarVerticalCollapsed',
      false
    );
    if (navbarVerticalToggle) {
      navbarVerticalToggle.addEventListener(Events.CLICK, e => {
        navbarVerticalToggle.blur();
        document.documentElement.classList.toggle(
          ClassNames.NAVBAR_VERTICAL_COLLAPSED
        );

        // Set collapse state on localStorage
        setItemToStore(
          'phoenixIsNavbarVerticalCollapsed',
          !isNavbarVerticalCollapsed
        );

        const event = new CustomEvent(Events.NAVBAR_VERTICAL_TOGGLE);
        e.currentTarget?.dispatchEvent(event);
      });
    }
    if (navbarVerticalCollapse) {
      if (activeNavLinkItem && !isNavbarVerticalCollapsed) {
        activeNavLinkItem.scrollIntoView({ behavior: 'smooth' });
      }
    }
    const setDocumentMinHeight = () => {
      const bodyHeight = document.querySelector(Selector.BODY).offsetHeight;
      const navbarVerticalHeight = document.querySelector(
        Selector.NAVBAR_VERTICAL
      )?.offsetHeight;

      if (
        document.documentElement.classList.contains(
          ClassNames.NAVBAR_VERTICAL_COLLAPSED
        ) &&
        bodyHeight < navbarVerticalHeight
      ) {
        document.documentElement.style.minHeight = `${navbarVerticalHeight}px`;
      } else {
        document.documentElement.removeAttribute('style');
      }
    };

    // set document min height for collapse vertical nav
    setDocumentMinHeight();
    resize(() => {
      setDocumentMinHeight();
    });
    if (navbarVerticalToggle) {
      navbarVerticalToggle.addEventListener('navbar.vertical.toggle', () => {
        setDocumentMinHeight();
      });
    }
  };

  /* eslint-disable no-new */
  /*-----------------------------------------------
  |                    Phoenix Offcanvas
  -----------------------------------------------*/

  const phoenixOffcanvasInit = () => {
    const { getData } = window.phoenix.utils;
    const toggleEls = document.querySelectorAll(
      "[data-phoenix-toggle='offcanvas']"
    );
    const offcanvasBackdrop = document.querySelector('[data-phoenix-backdrop]');
    const offcanvasBodyScroll = document.querySelector('[data-phoenix-scroll]');
    const offcanvasFaq = document.querySelector('.faq');
    const offcanvasFaqShow = document.querySelector('.faq-sidebar');

    const showFilterCol = offcanvasEl => {
      offcanvasEl.classList.add('show');
      if (!offcanvasBodyScroll) {
        document.body.style.overflow = 'hidden';
      }
    };
    const hideFilterCol = offcanvasEl => {
      offcanvasEl.classList.remove('show');
      document.body.style.removeProperty('overflow');
    };

    if (toggleEls) {
      toggleEls.forEach(toggleEl => {
        const offcanvasTarget = getData(toggleEl, 'phoenix-target');
        const offcanvasTargetEl = document.querySelector(offcanvasTarget);
        const closeBtn = offcanvasTargetEl.querySelectorAll(
          "[data-phoenix-dismiss='offcanvas']"
        );
        toggleEl.addEventListener('click', () => {
          showFilterCol(offcanvasTargetEl);
        });
        if (closeBtn) {
          closeBtn.forEach(el => {
            el.addEventListener('click', () => {
              hideFilterCol(offcanvasTargetEl);
            });
          });
        }
        if (offcanvasBackdrop) {
          offcanvasBackdrop.addEventListener('click', () => {
            hideFilterCol(offcanvasTargetEl);
          });
        }
      });
    }

    if (offcanvasFaq) {
      if (offcanvasFaqShow.classList.contains('show')) {
        offcanvasFaq.classList.add = 'newFaq';
      }
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                                   Popover                                  */
  /* -------------------------------------------------------------------------- */

  const picmoInit = () => {
    const { getData } = window.phoenix.utils;

    const picmoBtns = document.querySelectorAll('[data-picmo]');

    if (picmoBtns) {
      Array.from(picmoBtns).forEach(btn => {
        const options = getData(btn, 'picmo');

        const picker = window.picmoPopup.createPopup(
          {},
          {
            referenceElement: btn,
            triggerElement: btn,
            position: 'bottom-start',
            showCloseButton: false
          }
        );
        btn.addEventListener('click', () => {
          picker.toggle();
        });

        const input = document.querySelector(options.inputTarget);

        picker.addEventListener('emoji:select', selection => {
          if (input) {
            input.innerHTML += selection.emoji;
          }
        });
      });
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                                   Popover                                  */
  /* -------------------------------------------------------------------------- */

  const popoverInit = () => {
    const popoverTriggerList = Array.from(
      document.querySelectorAll('[data-bs-toggle="popover"]')
    );

    popoverTriggerList.map(popoverTriggerEl => {
      return new bootstrap.Popover(popoverTriggerEl);
    });
  };

  /* eslint-disable no-new */
  /*-----------------------------------------------
  |                    Swiper
  -----------------------------------------------*/

  const getThubmnailDirection = () => {
    if (
      window.innerWidth < 768 ||
      (window.innerWidth >= 992 && window.innerWidth < 1200)
    ) {
      return 'horizontal';
    }
    return 'vertical';
  };

  const productDetailsInit = () => {
    const { getData, resize } = window.phoenix.utils;
    const productDetailsEl = document.querySelector('[data-product-details]');
    if (productDetailsEl) {
      const colorVariantEl = productDetailsEl.querySelector(
        '[data-product-color]'
      );
      productDetailsEl.querySelector(
        '[data-product-quantity]'
      );
      const productQuantityInputEl = productDetailsEl.querySelector(
        '[data-quantity] input[type="number"]'
      );
      const productColorVariantConatiner = productDetailsEl.querySelector(
        '[data-product-color-variants]'
      );

      const swiperInit = productImages => {
        const productSwiper = productDetailsEl.querySelector(
          '[data-products-swiper]'
        );

        const options = getData(productSwiper, 'swiper');

        const thumbTarget = getData(productSwiper, 'thumb-target');

        const thumbEl = document.getElementById(thumbTarget);

        let slides = '';
        productImages.forEach(img => {
          slides += `
          <div class='swiper-slide '>
            <img class='w-100' src=${img} alt="">
          </div>
        `;
        });
        productSwiper.innerHTML = `<div class='swiper-wrapper'>${slides}</div>`;

        let thumbSlides = '';
        productImages.forEach(img => {
          thumbSlides += `
          <div class='swiper-slide '>
            <div class="product-thumb-container p-2 p-sm-3 p-xl-2">
              <img src=${img} alt="">
            </div>
          </div>
        `;
        });
        thumbEl.innerHTML = `<div class='swiper-wrapper'>${thumbSlides}</div>`;

        const thumbSwiper = new window.Swiper(thumbEl, {
          slidesPerView: 5,
          spaceBetween: 16,
          direction: getThubmnailDirection(),
          breakpoints: {
            768: {
              spaceBetween: 100
            },
            992: {
              spaceBetween: 16
            }
          }
        });

        const swiperNav = productSwiper.querySelector('.swiper-nav');

        resize(() => {
          thumbSwiper.changeDirection(getThubmnailDirection());
        });

        new Swiper(productSwiper, {
          ...options,
          navigation: {
            nextEl: swiperNav?.querySelector('.swiper-button-next'),
            prevEl: swiperNav?.querySelector('.swiper-button-prev')
          },
          thumbs: {
            swiper: thumbSwiper
          }
        });
      };

      const colorVariants =
        productColorVariantConatiner.querySelectorAll('[data-variant]');

      colorVariants.forEach(variant => {
        if (variant.classList.contains('active')) {
          swiperInit(getData(variant, 'products-images'));
          colorVariantEl.innerHTML = getData(variant, 'variant');
        }
        const productImages = getData(variant, 'products-images');

        variant.addEventListener('click', () => {
          swiperInit(productImages);
          colorVariants.forEach(colorVariant => {
            colorVariant.classList.remove('active');
          });
          variant.classList.add('active');
          colorVariantEl.innerHTML = getData(variant, 'variant');
        });
      });
      productQuantityInputEl.addEventListener('change', e => {
        if (e.target.value == '') {
          e.target.value = 0;
        }
      });
    }
  };

  /*-----------------------------------------------
  |  Quantity
  -----------------------------------------------*/
  const quantityInit = () => {
    const { getData } = window.phoenix.utils;
    const Selector = {
      DATA_QUANTITY_BTN: '[data-quantity] [data-type]',
      DATA_QUANTITY: '[data-quantity]',
      DATA_QUANTITY_INPUT: '[data-quantity] input[type="number"]'
    };

    const Events = {
      CLICK: 'click'
    };

    const Attributes = {
      MIN: 'min'
    };

    const DataKey = {
      TYPE: 'type'
    };

    const quantities = document.querySelectorAll(Selector.DATA_QUANTITY_BTN);

    quantities.forEach(quantity => {
      quantity.addEventListener(Events.CLICK, e => {
        const el = e.currentTarget;
        const type = getData(el, DataKey.TYPE);
        const numberInput = el
          .closest(Selector.DATA_QUANTITY)
          .querySelector(Selector.DATA_QUANTITY_INPUT);

        const min = numberInput.getAttribute(Attributes.MIN);
        let value = parseInt(numberInput.value, 10);

        if (type === 'plus') {
          value += 1;
        } else {
          value = value > min ? (value -= 1) : value;
        }
        numberInput.value = value;
      });
    });
  };

  /* -------------------------------------------------------------------------- */
  /*                               Ratings                               */
  /* -------------------------------------------------------------------------- */

  const randomColorInit = () => {
    const { getData } = window.phoenix.utils;

    const randomColorElements = document.querySelectorAll('[data-random-color]');
    const defaultColors = [
      '#EFF2F6',
      '#E3E6ED',
      '#CBD0DD',
      '#85A9FF',
      '#60C6FF',
      '#90D67F',
      '#F48270',
      '#FFCC85',
      '#3874FF',
      '#0097EB',
      '#25B003',
      '#EC1F00',
      '#E5780B',
      '#004DFF',
      '#0080C7',
      '#23890B',
      '#CC1B00',
      '#D6700A',
      '#222834',
      '#3E465B',
      '#6E7891',
      '#9FA6BC'
    ];

    randomColorElements.forEach(el => {
      const userColors = getData(el, 'random-color');
      let colors;
      if (Array.isArray(userColors)) {
        colors = [...defaultColors, ...userColors];
      } else {
        colors = [...defaultColors];
      }

      el.addEventListener('click', e => {
        const randomColor =
          colors[Math.floor(Math.random() * (colors.length - 1))];
        e.target.value = randomColor;
        const inputLabel = e.target.nextElementSibling;
        // e.target.nextElementSibling.style.boxShadow = `0 0 0 0.2rem ${randomColor}`;
        inputLabel.style.background = `${randomColor}`;
        inputLabel.style.borderColor = `${randomColor}`;
        inputLabel.style.color = `white`;
      });
    });
  };

  /* -------------------------------------------------------------------------- */
  /*                               Ratings                               */
  /* -------------------------------------------------------------------------- */

  const ratingInit = () => {
    const { getData, getItemFromStore } = window.phoenix.utils;
    const raters = document.querySelectorAll('[data-rater]');

    raters.forEach(rater => {
      const options = {
        reverse: getItemFromStore('phoenixIsRTL'),
        starSize: 32,
        step: 0.5,
        element: rater,
        rateCallback(rating, done) {
          this.setRating(rating);
          done();
        },
        ...getData(rater, 'rater')
      };

      return window.raterJs(options);
    });
  };

  /*eslint-disable*/
  /*-----------------------------------------------
  |   Top navigation opacity on scroll
  -----------------------------------------------*/

  const responsiveNavItemsInit = () => {
    const { resize } = window.phoenix.utils;
    const Selector = {
      NAV_ITEM: '[data-nav-item]',
      NAVBAR: '[data-navbar]',
      DROPDOWN: '[data-more-item]',
      CATEGORY_LIST: '[data-category-list]',
      CATEGORY_BUTTON: '[data-category-btn]'
    };

    const navbarEl = document.querySelector(Selector.NAVBAR);

    const navbar = () => {
      const navbarWidth = navbarEl.clientWidth;
      const dropdown = navbarEl.querySelector(Selector.DROPDOWN);
      const dropdownWidth = dropdown.clientWidth;
      const navbarContainerWidth = navbarWidth - dropdownWidth;
      const elements = navbarEl.querySelectorAll(Selector.NAV_ITEM);
      const categoryBtn = navbarEl.querySelector(Selector.CATEGORY_BUTTON);
      const categoryBtnWidth = categoryBtn.clientWidth;

      let totalItemsWidth = 0;
      dropdown.style.display = 'none';

      elements.forEach(item => {
        const itemWidth = item.clientWidth;

        totalItemsWidth = totalItemsWidth + itemWidth;

        if (
          totalItemsWidth + categoryBtnWidth + dropdownWidth >
            navbarContainerWidth &&
          !item.classList.contains('dropdown')
        ) {
          dropdown.style.display = 'block';
          item.style.display = 'none';
          const link = item.firstChild;
          const linkItem = link.cloneNode(true);

          navbarEl.querySelector('.category-list').appendChild(linkItem);
        }
      });
      const dropdownMenu = navbarEl.querySelectorAll('.dropdown-menu .nav-link');

      dropdownMenu.forEach(item => {
        item.classList.remove('nav-link');
        item.classList.add('dropdown-item');
      });
    };

    if (navbarEl) {
      window.addEventListener('load', () => {
        navbar();
        // hideDropdown();
      });

      resize(() => {
        const navElements = navbarEl.querySelectorAll(Selector.NAV_ITEM);
        const dropElements = navbarEl.querySelectorAll(Selector.CATEGORY_LIST);

        navElements.forEach(item => item.removeAttribute('style'));
        dropElements.forEach(item => (item.innerHTML = ''));
        navbar();
        // hideDropdown();
      });

      const navbarLinks = navbarEl.querySelectorAll('.nav-link');

      navbarEl.addEventListener('click', function (e) {
        for (let x = 0; x < navbarLinks.length; x++) {
          navbarLinks[x].classList.remove('active');
        }
        if (e.target.closest('li')) {
          e.target.closest('li').classList.add('active');
        }
      });
    }
  };

  const searchInit = () => {
    const Selectors = {
      SEARCH_DISMISS: '[data-bs-dismiss="search"]',
      DROPDOWN_TOGGLE: '[data-bs-toggle="dropdown"]',
      DROPDOWN_MENU: '.dropdown-menu',
      SEARCH_BOX: '.search-box',
      SEARCH_INPUT: '.search-input',
      SEARCH_TOGGLE: '[data-bs-toggle="search"]'
    };

    const ClassName = {
      SHOW: 'show'
    };

    const Attribute = {
      ARIA_EXPANDED: 'aria-expanded'
    };

    const Events = {
      CLICK: 'click',
      FOCUS: 'focus',
      SHOW_BS_DROPDOWN: 'show.bs.dropdown',
      SEARCH_CLOSE: 'search.close'
    };

    const hideSearchSuggestion = searchArea => {
      const el = searchArea.querySelector(Selectors.SEARCH_TOGGLE);
      const dropdownMenu = searchArea.querySelector(Selectors.DROPDOWN_MENU);
      if (!el || !dropdownMenu) return;

      el.setAttribute(Attribute.ARIA_EXPANDED, 'false');
      el.classList.remove(ClassName.SHOW);
      dropdownMenu.classList.remove(ClassName.SHOW);
    };

    const searchAreas = document.querySelectorAll(Selectors.SEARCH_BOX);

    const hideAllSearchAreas = () => {
      searchAreas.forEach(hideSearchSuggestion);
    };

    searchAreas.forEach(searchArea => {
      const input = searchArea.querySelector(Selectors.SEARCH_INPUT);
      const btnDropdownClose = searchArea.querySelector(Selectors.SEARCH_DISMISS);
      const dropdownMenu = searchArea.querySelector(Selectors.DROPDOWN_MENU);

      if (input) {
        input.addEventListener(Events.FOCUS, () => {
          hideAllSearchAreas();
          const el = searchArea.querySelector(Selectors.SEARCH_TOGGLE);
          if (!el || !dropdownMenu) return;
          el.setAttribute(Attribute.ARIA_EXPANDED, 'true');
          el.classList.add(ClassName.SHOW);
          dropdownMenu.classList.add(ClassName.SHOW);
        });
      }

      document.addEventListener(Events.CLICK, ({ target }) => {
        !searchArea.contains(target) && hideSearchSuggestion(searchArea);
      });

      btnDropdownClose &&
        btnDropdownClose.addEventListener(Events.CLICK, e => {
          hideSearchSuggestion(searchArea);
          input.value = '';
          const event = new CustomEvent(Events.SEARCH_CLOSE);
          e.currentTarget.dispatchEvent(event);
        });
    });

    document.querySelectorAll(Selectors.DROPDOWN_TOGGLE).forEach(dropdown => {
      dropdown.addEventListener(Events.SHOW_BS_DROPDOWN, () => {
        hideAllSearchAreas();
      });
    });
  };

  /* -------------------------------------------------------------------------- */
  /*                                    Toast                                   */
  /* -------------------------------------------------------------------------- */

  const simplebarInit = () => {
    const scrollEl = Array.from(document.querySelectorAll('.scrollbar-overlay'));

    scrollEl.forEach(el => {
      return new window.SimpleBar(el);
    });
  };

  /* -------------------------------------------------------------------------- */
  /*                                 SortableJS                                 */
  /* -------------------------------------------------------------------------- */

  const sortableInit = () => {
    const { getData } = window.phoenix.utils;

    const sortableEl = document.querySelectorAll('[data-sortable]');

    const defaultOptions = {
      animation: 150,
      group: {
        name: 'shared'
      },
      delay: 100,
      delayOnTouchOnly: true, // useful for mobile touch
      forceFallback: true, // * ignore the HTML5 DnD behaviour
      onStart() {
        document.body.classList.add('sortable-dragging'); // to add cursor grabbing
      },
      onEnd() {
        document.body.classList.remove('sortable-dragging');
      }
    };

    sortableEl.forEach(el => {
      const userOptions = getData(el, 'sortable');
      const options = window._.merge(defaultOptions, userOptions);

      return window.Sortable.create(el, options);
    });
  };

  const supportChatInit = () => {
    const supportChat = document.querySelector('.support-chat');
    const supportChatBtn = document.querySelectorAll('.btn-support-chat');
    const supportChatcontainer = document.querySelector(
      '.support-chat-container'
    );
    const { phoenixSupportChat } = window.config.config;

    if (phoenixSupportChat) {
      supportChatcontainer?.classList.add('show');
    }
    if (supportChatBtn) {
      supportChatBtn.forEach(item => {
        item.addEventListener('click', () => {
          supportChat.classList.toggle('show-chat');

          supportChatBtn[supportChatBtn.length - 1].classList.toggle(
            'btn-chat-close'
          );

          supportChatcontainer.classList.add('show');
        });
      });
    }
  };

  /* eslint-disable no-new */
  /*-----------------------------------------------
  |                    Swiper
  -----------------------------------------------*/

  const swiperInit = () => {
    const { getData } = window.phoenix.utils;
    const swiperContainers = document.querySelectorAll('.swiper-theme-container');

    if (swiperContainers) {
      swiperContainers.forEach(swiperContainer => {
        const swiper = swiperContainer.querySelector('[data-swiper]');

        const options = getData(swiper, 'swiper');
        const thumbsOptions = options.thumb;
        let thumbsInit;
        if (thumbsOptions) {
          const thumbImages = swiper.querySelectorAll('img');
          let slides = '';
          thumbImages.forEach(img => {
            slides += `
          <div class='swiper-slide '>
            <img class='img-fluid rounded mt-1' src=${img.src} alt=''/>
          </div>
        `;
          });

          const thumbs = document.createElement('div');
          thumbs.setAttribute('class', 'swiper-container thumb');
          thumbs.innerHTML = `<div class='swiper-wrapper'>${slides}</div>`;

          if (thumbsOptions.parent) {
            const parent = document.querySelector(thumbsOptions.parent);
            parent.parentNode.appendChild(thumbs);
          } else {
            swiper.parentNode.appendChild(thumbs);
          }

          thumbsInit = new window.Swiper(thumbs, thumbsOptions);
        }

        const swiperNav = swiperContainer.querySelector('.swiper-nav');

        new window.Swiper(swiper, {
          ...options,
          navigation: {
            nextEl: swiperNav?.querySelector('.swiper-button-next'),
            prevEl: swiperNav?.querySelector('.swiper-button-prev')
          },
          thumbs: {
            swiper: thumbsInit
          }
        });
      });
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                                Theme Control                               */
  /* -------------------------------------------------------------------------- */
  /* eslint-disable no-param-reassign */
  /* eslint-disable */
  const { config } = window.config;

  const initialDomSetup = element => {
    const { getData, getItemFromStore } = window.phoenix.utils;
    if (!element) return;

    element.querySelectorAll('[data-theme-control]').forEach(el => {
      const inputDataAttributeValue = getData(el, 'theme-control');
      const localStorageValue = getItemFromStore(inputDataAttributeValue);

      // diable horizontal navbar shape for dual nav
      if (
        inputDataAttributeValue === 'phoenixNavbarTopShape' &&
        getItemFromStore('phoenixNavbarPosition') === 'dual-nav')
          {
        el.setAttribute('disabled', true);
      }

      // diable navbar vertical style for horizontal & dual navbar
      const currentNavbarPosition = getItemFromStore('phoenixNavbarPosition');
      const isHorizontalOrDualNav = (currentNavbarPosition === "horizontal") || (currentNavbarPosition ==='dual-nav');
      if (
        inputDataAttributeValue === 'phoenixNavbarVerticalStyle' &&
        isHorizontalOrDualNav)
        {
          el.setAttribute('disabled', true);
        }

      if (el.type === 'checkbox') {
        if (inputDataAttributeValue === 'phoenixTheme') {
          localStorageValue === 'dark' && el.setAttribute('checked', true);
        } else {
          localStorageValue && el.setAttribute('checked', true);
        }
      } else if (
        el.type === 'radio' &&
        inputDataAttributeValue === 'phoenixNavbarVerticalStyle'
      ) {
        localStorageValue === 'darker' &&
          el.value === 'darker' &&
          el.setAttribute('checked', true);
        localStorageValue === 'default' &&
          el.value === 'default' &&
          el.setAttribute('checked', true);
      } else if (
        el.type === 'radio' &&
        inputDataAttributeValue === 'phoenixNavbarTopShape'
      ) {
        localStorageValue === 'slim' &&
          el.value === 'slim' &&
          el.setAttribute('checked', true);
        localStorageValue === 'default' &&
          el.value === 'default' &&
          el.setAttribute('checked', true);
      } else if (
        el.type === 'radio' &&
        inputDataAttributeValue === 'phoenixNavbarTopStyle'
      ) {
        localStorageValue === 'darker' &&
          el.value === 'darker' &&
          el.setAttribute('checked', true);
        localStorageValue === 'default' &&
          el.value === 'default' &&
          el.setAttribute('checked', true);
      } else {
        const isChecked = localStorageValue === el.value;
        isChecked && el.setAttribute('checked', true);
      }
    });
  };

  const changeTheme = element => {
    const { getData, getItemFromStore } = window.phoenix.utils;

    element
      .querySelectorAll('[data-theme-control = "phoenixTheme"]')
      .forEach(el => {
        const inputDataAttributeValue = getData(el, 'theme-control');
        const localStorageValue = getItemFromStore(inputDataAttributeValue);

        if (el.type === 'checkbox') {
          localStorageValue === 'dark'
            ? (el.checked = true)
            : (el.checked = false);
        } else {
          localStorageValue === el.value
            ? (el.checked = true)
            : (el.checked = false);
        }
      });
  };

  const themeControl = () => {
    const { getData, getItemFromStore } = window.phoenix.utils;

    const handlePageUrl = el => {
      const pageUrl = getData(el, 'page-url');
      if (pageUrl) {
        window.location.replace(pageUrl);
      } else {
        window.location.reload();
      }
    };

    const themeController = new DomNode(document.body);

    const navbarVertical = document.querySelector('.navbar-vertical');
    const navbarTop = document.querySelector('.navbar-top');
    const supportChat = document.querySelector('.support-chat-container');
    initialDomSetup(themeController.node);

    themeController.on('click', e => {
      const target = new DomNode(e.target);

      if (target.data('theme-control')) {
        const control = target.data('theme-control');

        let value = e.target[e.target.type === 'radio' ? 'value' : 'checked'];

        if (control === 'phoenixTheme') {
          typeof value === 'boolean' && (value = value ? 'dark' : 'light');
        }

        // config.hasOwnProperty(control) && setItemToStore(control, value);
        config.hasOwnProperty(control) &&
          window.config.set({
            [control]: value
          });

        window.history.replaceState(null, null, window.location.pathname);
        switch (control) {
          case 'phoenixTheme': {
            document.documentElement.classList[
              value === 'dark' ? 'add' : 'remove'
            ]('dark');
            const clickControl = new CustomEvent('clickControl', {
              detail: { control, value }
            });
            e.currentTarget.dispatchEvent(clickControl);
            changeTheme(themeController.node);
            break;
          }
          case 'phoenixNavbarVerticalStyle': {
            navbarVertical.classList.remove('navbar-darker');          
            if (value !== 'default') {
              navbarVertical.classList.add(`navbar-${value}`);
            }
            break;
          }
          case 'phoenixNavbarTopStyle': {
            navbarTop.classList.remove('navbar-darker');
            if (value !== 'transparent') {
              navbarTop.classList.add(`navbar-${value}`);
            }
            break;
          }
          case 'phoenixNavbarTopShape':
            {
              if(getItemFromStore('phoenixNavbarPosition') === 'dual-nav'){
                el.setAttribute('disabled', true);
              }
              else 
                handlePageUrl(target.node);
            }
            break;
          case 'phoenixNavbarPosition':
            {
              handlePageUrl(target.node);
            }

            break;
          case 'phoenixIsRTL':
            {
              // localStorage.setItem('phoenixIsRTL', target.node.checked);
              window.config.set({
                phoenixIsRTL: target.node.checked
              });
              window.location.reload();
            }
            break;

          case 'phoenixSupportChat': {
            supportChat?.classList.remove('show');
            if (value) {
              supportChat?.classList.add('show');
            }
            break;
          }

          case 'reset': {
            window.config.reset();
            window.location.reload();
            break;
          }

          default: {
            window.location.reload();
          }
        }
      }
    });
  };

  const { merge } = window._;

  /* -------------------------------------------------------------------------- */
  /*                                   Tinymce                                  */
  /* -------------------------------------------------------------------------- */

  const tinymceInit = () => {
    const { getColor, getData, getItemFromStore } = window.phoenix.utils;

    const tinymces = document.querySelectorAll('[data-tinymce]');

    if (window.tinymce) {
      document.querySelector('.tox-sidebar-wrap');
      tinymces.forEach(tinymceEl => {
        const userOptions = getData(tinymceEl, 'tinymce');
        const options = merge(
          {
            selector: '.tinymce',
            height: '50vh',
            skin: 'oxide',
            menubar: false,
            content_style: `
        .mce-content-body { 
          color: ${getColor('black')} 
        }
        .mce-content-body[data-mce-placeholder]:not(.mce-visualblocks)::before {
          color: ${getColor('gray-400')};
          font-weight: 400;
          font-size: 12.8px;
        }
        `,
            // mobile: {
            //   theme: 'mobile',
            //   toolbar: ['undo', 'bold']
            // },
            statusbar: false,
            plugins: 'link,image,lists,table,media',
            theme_advanced_toolbar_align: 'center',
            directionality: getItemFromStore('phoenixIsRTL') ? 'rtl' : 'ltr',
            toolbar: [
              { name: 'history', items: ['undo', 'redo'] },
              {
                name: 'formatting',
                items: ['bold', 'italic', 'underline', 'strikethrough']
              },
              {
                name: 'alignment',
                items: ['alignleft', 'aligncenter', 'alignright', 'alignjustify']
              },
              { name: 'list', items: ['numlist', 'bullist'] },
              { name: 'link', items: ['link'] }
            ],
            setup: editor => {
              editor.on('focus', () => {
                const wraper = document.querySelector('.tox-sidebar-wrap');
                wraper.classList.add('editor-focused');
              });
              editor.on('blur', () => {
                const wraper = document.querySelector('.tox-sidebar-wrap');
                wraper.classList.remove('editor-focused');
              });
            }
          },
          userOptions
        );
        window.tinymce.init(options);
      });

      const themeController = document.body;
      if (themeController) {
        themeController.addEventListener(
          'clickControl',
          ({ detail: { control } }) => {
            if (control === 'phoenixTheme') {
              tinymces.forEach(tinymceEl => {
                const instance = window.tinymce.get(tinymceEl.id);
                instance.dom.addStyle(
                  `.mce-content-body{color: ${getColor('black')} !important;}`
                );
              });
            }
          }
        );
      }
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                                    Toast                                   */
  /* -------------------------------------------------------------------------- */

  const toastInit = () => {
    const toastElList = [].slice.call(document.querySelectorAll('.toast'));
    toastElList.map(toastEl => new bootstrap.Toast(toastEl));

    const liveToastBtn = document.getElementById('liveToastBtn');

    if (liveToastBtn) {
      const liveToast = new bootstrap.Toast(document.getElementById('liveToast'));

      liveToastBtn.addEventListener('click', () => {
        liveToast && liveToast.show();
      });
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                                    TODO Offacanvas                                   */
  /* -------------------------------------------------------------------------- */

  const todoOffcanvasInit = () => {
    const { getData } = window.phoenix.utils;

    const stopPropagationElements = document.querySelectorAll(
      '[data-event-propagation-prevent]'
    );

    if (stopPropagationElements) {
      stopPropagationElements.forEach(el => {
        el.addEventListener('click', e => {
          e.stopPropagation();
        });
      });
    }

    const todoList = document.querySelector('.todo-list');

    if (todoList) {
      const offcanvasToggles = todoList.querySelectorAll(
        '[data-todo-offcanvas-toogle]'
      );

      offcanvasToggles.forEach(toggle => {
        const target = getData(toggle, 'todo-offcanvas-target');
        const offcanvasEl = todoList.querySelector(`#${target}`);
        const todoOffcanvas = new window.bootstrap.Offcanvas(offcanvasEl, {
          backdrop: true
        });
        toggle.addEventListener('click', () => {
          todoOffcanvas.show();
        });
      });
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                                   Tooltip                                  */
  /* -------------------------------------------------------------------------- */
  const tooltipInit = () => {
    const tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );

    tooltipTriggerList.map(
      tooltipTriggerEl =>
        new bootstrap.Tooltip(tooltipTriggerEl, {
          trigger: 'hover'
        })
    );
  };

  /* eslint-disable no-restricted-syntax */
  /* -------------------------------------------------------------------------- */
  /*                                 step wizard                                */
  /* -------------------------------------------------------------------------- */
  const wizardInit = () => {
    const { getData } = window.phoenix.utils;

    const selectors = {
      WIZARDS: '[data-theme-wizard]',
      TOGGLE_BUTTON_EL: '[data-wizard-step]',
      FORMS: '[data-wizard-form]',
      PASSWORD_INPUT: '[data-wizard-password]',
      CONFIRM_PASSWORD_INPUT: '[data-wizard-confirm-password]',
      NEXT_BTN: '[data-wizard-next-btn]',
      PREV_BTN: '[data-wizard-prev-btn]',
      FOOTER: '[data-wizard-footer]',
      KANBAN_STEP: '[data-kanban-step]'
    };
    const ClassName = {
      KANBAN_PROGRESSBAR: 'theme-wizard-progress'
    };

    const events = {
      SUBMIT: 'submit',
      SHOW: 'show.bs.tab',
      SHOWN: 'shown.bs.tab',
      CLICK: 'click'
    };

    const wizards = document.querySelectorAll(selectors.WIZARDS);

    wizards.forEach(wizard => {
      const tabToggleButtonEl = wizard.querySelectorAll(
        selectors.TOGGLE_BUTTON_EL
      );
      const forms = wizard.querySelectorAll(selectors.FORMS);
      const passwordInput = wizard.querySelector(selectors.PASSWORD_INPUT);
      const confirmPasswordInput = wizard.querySelector(
        selectors.CONFIRM_PASSWORD_INPUT
      );
      const nextButton = wizard.querySelector(selectors.NEXT_BTN);
      const prevButton = wizard.querySelector(selectors.PREV_BTN);
      const wizardFooter = wizard.querySelector(selectors.FOOTER);
      const submitEvent = new Event(events.SUBMIT, {
        bubbles: true,
        cancelable: true
      });
      const hasKanbanProgress = wizard.classList.contains(
        ClassName.KANBAN_PROGRESSBAR
      );

      const tabs = Array.from(tabToggleButtonEl).map(item => {
        return window.bootstrap.Tab.getOrCreateInstance(item);
      });
      // console.log({ tabs });

      let count = 0;
      let showEvent = null;

      forms.forEach(form => {
        form.addEventListener(events.SUBMIT, e => {
          e.preventDefault();
          if (form.classList.contains('needs-validation')) {
            if (passwordInput && confirmPasswordInput) {
              if (passwordInput.value !== confirmPasswordInput.value) {
                confirmPasswordInput.setCustomValidity('Invalid field.');
              } else {
                confirmPasswordInput.setCustomValidity('');
              }
            }
            if (!form.checkValidity()) {
              showEvent.preventDefault();
              return false;
            }
          }
          count += 1;
          return null;
        });
      });

      nextButton.addEventListener(events.CLICK, () => {
        if (count + 1 < tabs.length) {
          tabs[count + 1].show();
        }
      });

      prevButton.addEventListener(events.CLICK, () => {
        count -= 1;
        tabs[count].show();
      });

      if (tabToggleButtonEl.length) {
        tabToggleButtonEl.forEach((item, index) => {
          item.addEventListener(events.SHOW, e => {
            const step = getData(item, 'wizard-step');
            showEvent = e;
            if (step > count) {
              forms[count].dispatchEvent(submitEvent);
            }
          });
          item.addEventListener(events.SHOWN, () => {
            count = index;
            // can't go back tab
            if (count === tabToggleButtonEl.length - 1 && !hasKanbanProgress) {
              tabToggleButtonEl.forEach(tab => {
                tab.setAttribute('data-bs-toggle', 'modal');
                tab.setAttribute('data-bs-target', '#error-modal');
              });
            }
            // add done class
            for (let i = 0; i < count; i += 1) {
              tabToggleButtonEl[i].classList.add('done');
              if (i > 0) {
                tabToggleButtonEl[i - 1].classList.add('complete');
              }
            }
            // remove done class
            for (let j = count; j < tabToggleButtonEl.length; j += 1) {
              tabToggleButtonEl[j].classList.remove('done');
              if (j > 0) {
                tabToggleButtonEl[j - 1].classList.remove('complete');
              }
            }

            // card footer remove at last step
            if (count > tabToggleButtonEl.length - 2) {
              wizardFooter.classList.add('d-none');
            } else {
              wizardFooter.classList.remove('d-none');
            }
            // prev-button removing
            if (count > 0 && count !== tabToggleButtonEl.length - 1) {
              prevButton.classList.remove('d-none');
            } else {
              prevButton.classList.add('d-none');
            }
          });
        });
      }
    });
  };

  const faqTabInit = () => {
    const triggerEls = document.querySelectorAll('[data-vertical-category-tab]');
    const offcanvasEle = document.querySelector(
      '[data-vertical-category-offcanvas]'
    );
    const filterEles = document.querySelectorAll('[data-category-filter]');
    const faqSubcategoryTabs = document.querySelectorAll(
      '.faq-subcategory-tab .nav-item'
    );

    if (offcanvasEle) {
      const offcanvas =
        window.bootstrap.Offcanvas?.getOrCreateInstance(offcanvasEle);

      triggerEls.forEach(el => {
        el.addEventListener('click', () => {
          offcanvas.hide();
        });
      });
    }

    if (filterEles) {
      filterEles.forEach(el => {
        if (el.classList.contains('active')) {
          faqSubcategoryTabs.forEach(item => {
            if (
              !item.classList.contains(el.getAttribute('data-category-filter')) &&
              el.getAttribute('data-category-filter') !== 'all'
            ) {
              item.classList.add('d-none');
            }
          });
        }
        el.addEventListener('click', () => {
          faqSubcategoryTabs.forEach(item => {
            if (el.getAttribute('data-category-filter') === 'all') {
              item.classList.remove('d-none');
            } else if (
              !item.classList.contains(el.getAttribute('data-category-filter'))
            ) {
              item.classList.add('d-none');
            }
          });
        });
      });
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                                    Kanban                                  */
  /* -------------------------------------------------------------------------- */

  const kanbanInit = () => {
    // kanbanContainer to controll collapse behavior in kanban board
    const kanbanContainer = document.querySelector('[data-kanban-container]');
    if (kanbanContainer) {
      kanbanContainer.addEventListener('click', e => {
        if (e.target.hasAttribute('data-kanban-collapse')) {
          e.target.closest('.kanban-column').classList.toggle('collapsed');
        }
      });

      const kanbanGroups = kanbanContainer.querySelectorAll('[data-sortable]');
      kanbanGroups.forEach(item => {
        const itemInstance = window.Sortable.get(item);
        itemInstance.option('onStart', e => {
          document.body.classList.add('sortable-dragging');
          window.Sortable.ghost
            .querySelector('.dropdown-menu')
            .classList.remove('show');
          const dropdownElement = e.item.querySelector(
            `[data-bs-toggle='dropdown']`
          );
          window.bootstrap.Dropdown.getInstance(dropdownElement)?.hide();
        });

        // return itemInstance;
      });
    }
  };

  const towFAVerificarionInit = () => {
    const verificationForm = document.querySelector('[data-2FA-varification]');
    const inputFields = document.querySelectorAll(
      '[data-2FA-varification] input[type=number]'
    );

    if (verificationForm) {
      window.addEventListener('load', () => inputFields[0].focus());
      // check if the value is not a number
      verificationForm.addEventListener('keypress', e => {
        if (e.target.matches('input[type=number]')) {
          if (/\D/.test(e.key) || !!e.target.value) {
            e.preventDefault();
          }
        }
      });

      // after entering a value get focus on the next input field and remove the disabled attribute
      const inputs = [...inputFields];
      verificationForm.addEventListener('input', e => {
        if (e.target.matches('input[type=number]')) {
          const index = inputs.indexOf(e.target);
          const nextInput = inputs[index + 1];
          if (
            nextInput &&
            e.target.value !== '' &&
            nextInput.hasAttribute('disabled')
          ) {
            nextInput.removeAttribute('disabled');
            nextInput.focus();
          }
        }
      });

      // backspace functionality
      verificationForm.addEventListener('keydown', e => {
        if (e.target.matches('input[type=number]') && e.keyCode === 8) {
          const index = inputs.indexOf(e.target);
          const prevInput = inputs[index - 1];
          if (prevInput) {
            prevInput.focus();
            e.target.value = '';
            e.target.setAttribute('disabled', true);
          }
        }
      });

      // return merged code
      verificationForm.addEventListener('submit', () => {
        const code = inputs.map(input => input.value).join('');
        return code;
      });
    }
  };

  /* eslint-disable no-new */

  window.initMap = initMap;
  docReady(detectorInit);
  docReady(simplebarInit);
  docReady(toastInit);
  docReady(tooltipInit);
  docReady(featherIconsInit);
  docReady(basicEchartsInit);
  docReady(bulkSelectInit);
  docReady(listInit);
  docReady(anchorJSInit);
  docReady(popoverInit);
  docReady(formValidationInit);
  docReady(docComponentInit);
  docReady(swiperInit);
  docReady(productDetailsInit);
  docReady(ratingInit);
  docReady(quantityInit);
  docReady(dropzoneInit);
  docReady(choicesInit);
  docReady(tinymceInit);
  docReady(responsiveNavItemsInit);
  docReady(flatpickrInit);
  docReady(iconCopiedInit);
  docReady(isotopeInit);
  docReady(bigPictureInit);
  docReady(countupInit);
  docReady(phoenixOffcanvasInit);
  docReady(todoOffcanvasInit);
  docReady(wizardInit);
  docReady(reportsDetailsChartInit);
  docReady(glightboxInit);
  docReady(themeControl);
  docReady(searchInit);
  docReady(handleNavbarVerticalCollapsed);
  docReady(navbarInit);
  docReady(themeControl);
  docReady(navbarComboInit);
  docReady(fullCalendarInit);
  docReady(picmoInit);

  docReady(chatInit);
  docReady(modalInit);
  docReady(lottieInit);
  docReady(navbarShadowOnScrollInit);
  docReady(dropdownOnHover);
  docReady(supportChatInit);
  docReady(sortableInit);

  docReady(copyLink);
  docReady(randomColorInit);
  docReady(faqTabInit);
  docReady(createBoardInit);
  docReady(advanceAjaxTableInit);
  docReady(kanbanInit);
  docReady(towFAVerificarionInit);

  docReady(() => {
    const selectedRowsBtn = document.querySelector('[data-selected-rows]');
    const selectedRows = document.getElementById('selectedRows');
    if (selectedRowsBtn) {
      const bulkSelectEl = document.getElementById('bulk-select-example');
      const bulkSelectInstance =
        window.phoenix.BulkSelect.getInstance(bulkSelectEl);
      selectedRowsBtn.addEventListener('click', () => {
        selectedRows.innerHTML = JSON.stringify(
          bulkSelectInstance.getSelectedRows(),
          undefined,
          2
        );
      });
    }
  });

  var phoenix = {
    utils,
    BulkSelect
  };

  return phoenix;

}));
//# sourceMappingURL=phoenix.js.map

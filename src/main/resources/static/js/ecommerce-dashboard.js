(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
})((function () { 'use strict';

  // import * as echarts from 'echarts';
  const { merge } = window._;

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
    chart.setOption(merge(getDefaultOptions(), userOptions));

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

  const tooltipFormatter = (params, dateFormatter = 'MMM DD') => {
    let tooltipItem = ``;
    params.forEach(el => {
      tooltipItem += `<div class='ms-1'>
        <h6 class="text-700"><span class="fas fa-circle me-1 fs--2" style="color:${
          el.borderColor ? el.borderColor : el.color
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
                  ? window.dayjs(params[0].axisValue).format(dateFormatter)
                  : params[0].axisValue
              }
            </p>
            ${tooltipItem}
          </div>`;
  };

  const handleTooltipPosition = ([pos, , dom, , size]) => {
    // only for mobile device
    if (window.innerWidth <= 540) {
      const tooltipHeight = dom.offsetHeight;
      const obj = { top: pos[1] - tooltipHeight - 20 };
      obj[pos[0] < size.viewSize[0] / 2 ? 'left' : 'right'] = 5;
      return obj;
    }
    return null; // else default behaviour
  };

  /* -------------------------------------------------------------------------- */
  /*                     Echart Bar Member info                                 */
  /* -------------------------------------------------------------------------- */

  const newCustomersChartsInit = () => {
    const { getColor, getData, getDates } = window.phoenix.utils;
    const $echartNewCustomersCharts = document.querySelector(
      '.echarts-new-customers'
    );
    const tooltipFormatter = params => {
      const currentDate = window.dayjs(params[0].axisValue);
      const prevDate = window.dayjs(params[0].axisValue).subtract(1, 'month');

      const result = params.map((param, index) => ({
        value: param.value,
        date: index > 0 ? prevDate : currentDate,
        color: param.color
      }));

      let tooltipItem = ``;
      result.forEach((el, index) => {
        tooltipItem += `<h6 class="fs--1 text-700 ${
        index > 0 && 'mb-0'
      }"><span class="fas fa-circle me-2" style="color:${el.color}"></span>
      ${el.date.format('MMM DD')} : ${el.value}
    </h6>`;
      });
      return `<div class='ms-1'>
              ${tooltipItem}
            </div>`;
    };

    if ($echartNewCustomersCharts) {
      const userOptions = getData($echartNewCustomersCharts, 'echarts');
      const chart = window.echarts.init($echartNewCustomersCharts);
      const getDefaultOptions = () => ({
        tooltip: {
          trigger: 'axis',
          padding: 10,
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
        xAxis: [
          {
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
              lineStyle: { color: getColor('gray-200') }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              formatter: value => window.dayjs(value).format('DD MMM'),
              showMinLabel: true,
              showMaxLabel: false,
              color: getColor('gray-800'),
              align: 'left',
              interval: 5,
              fontFamily: 'Nunito Sans',
              fontWeight: 600,
              fontSize: 12.8
            }
          },
          {
            type: 'category',
            position: 'bottom',
            show: true,
            data: getDates(
              new Date('5/1/2022'),
              new Date('5/7/2022'),
              1000 * 60 * 60 * 24
            ),
            axisLabel: {
              formatter: value => window.dayjs(value).format('DD MMM'),
              interval: 130,
              showMaxLabel: true,
              showMinLabel: false,
              color: getColor('gray-800'),
              align: 'right',
              fontFamily: 'Nunito Sans',
              fontWeight: 600,
              fontSize: 12.8
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            boundaryGap: false
          }
        ],
        yAxis: {
          show: false,
          type: 'value',
          boundaryGap: false
        },
        series: [
          {
            type: 'line',
            data: [150, 100, 300, 200, 250, 180, 250],
            showSymbol: false,
            symbol: 'circle',
            lineStyle: {
              width: 2,
              color: getColor('gray-200')
            },
            emphasis: {
              lineStyle: {
                color: getColor('gray-200')
              }
            }
          },
          {
            type: 'line',
            data: [200, 150, 250, 100, 500, 400, 600],
            lineStyle: {
              width: 2,
              color: getColor('primary')
            },
            showSymbol: false,
            symbol: 'circle'
          }
        ],
        grid: { left: 0, right: 0, top: 5, bottom: 20 }
      });
      echartSetOption(chart, userOptions, getDefaultOptions);
    }
  };

  const { echarts: echarts$2 } = window;

  /* -------------------------------------------------------------------------- */
  /*                                Market Share                                */
  /* -------------------------------------------------------------------------- */

  const payingCustomerChartInit = () => {
    const { getData, getColor } = window.phoenix.utils;
    const $chartEl = document.querySelector('.echarts-paying-customer-chart');

    if ($chartEl) {
      const userOptions = getData($chartEl, 'options');
      const chart = echarts$2.init($chartEl);

      const getDefaultOptions = () => ({
        tooltip: {
          trigger: 'item',
          padding: [7, 10],
          backgroundColor: getColor('gray-100'),
          borderColor: getColor('gray-300'),
          textStyle: { color: getColor('dark') },
          borderWidth: 1,
          position: (...params) => handleTooltipPosition(params),
          transitionDuration: 0,
          formatter: params => {
            return `<strong>${params.seriesName}:</strong> ${params.value}%`;
          }
        },
        legend: { show: false },
        series: [
          {
            type: 'gauge',
            center: ['50%', '60%'],
            name: 'Paying customer',
            startAngle: 180,
            endAngle: 0,
            min: 0,
            max: 100,
            splitNumber: 12,
            itemStyle: {
              color: getColor('primary')
            },
            progress: {
              show: true,
              roundCap: true,
              width: 12,
              itemStyle: {
                shadowBlur: 0,
                shadowColor: '#0000'
              }
            },
            pointer: {
              show: false
            },
            axisLine: {
              roundCap: true,
              lineStyle: {
                width: 12,
                color: [[1, getColor('primary-100')]]
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisLabel: {
              show: false
            },
            title: {
              show: false
            },
            detail: {
              show: false
            },
            data: [
              {
                value: 30
              }
            ]
          }
        ]
      });

      echartSetOption(chart, userOptions, getDefaultOptions);
    }
  };

  // dayjs.extend(advancedFormat);

  /* -------------------------------------------------------------------------- */
  /*                             Echarts Total Sales                            */
  /* -------------------------------------------------------------------------- */

  const projectionVsActualChartInit = () => {
    const { getColor, getData, getPastDates } = window.phoenix.utils;
    const $projectionVsActualChartEl = document.querySelector(
      '.echart-projection-actual'
    );

    const dates = getPastDates(10);

    const data1 = [
      44485, 20428, 47302, 45180, 31034, 46358, 26581, 36628, 38219, 43256
    ];

    const data2 = [
      38911, 29452, 31894, 47876, 31302, 27731, 25490, 30355, 27176, 30393
    ];

    if ($projectionVsActualChartEl) {
      const userOptions = getData($projectionVsActualChartEl, 'echarts');
      const chart = window.echarts.init($projectionVsActualChartEl);

      const getDefaultOptions = () => ({
        color: [getColor('primary'), getColor('gray-300')],
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
          position: (...params) => handleTooltipPosition(params),
          formatter: params => tooltipFormatter(params)
        },
        legend: {
          data: ['Projected revenue', 'Actual revenue'],
          right: 'right',
          width: '100%',
          itemWidth: 16,
          itemHeight: 8,
          itemGap: 20,
          top: 3,
          inactiveColor: getColor('gray-500'),
          textStyle: {
            color: getColor('gray-900'),
            fontWeight: 600,
            fontFamily: 'Nunito Sans'
            // fontSize: '12.8px'
          }
        },
        xAxis: {
          type: 'category',
          // boundaryGap: false,
          axisLabel: {
            color: getColor('gray-800'),
            formatter: value => window.dayjs(value).format('MMM DD'),
            interval: 3,
            fontFamily: 'Nunito Sans',
            fontWeight: 600,
            fontSize: 12.8
          },
          data: dates,
          axisLine: {
            lineStyle: {
              color: getColor('gray-300')
            }
          },
          axisTick: false
        },
        yAxis: {
          axisPointer: { type: 'none' },
          // boundaryGap: false,
          axisTick: 'none',
          splitLine: {
            interval: 5,
            lineStyle: {
              color: getColor('gray-200')
            }
          },
          axisLine: { show: false },
          axisLabel: {
            fontFamily: 'Nunito Sans',
            fontWeight: 600,
            fontSize: 12.8,
            color: getColor('gray-800'),
            margin: 20,
            verticalAlign: 'bottom',
            formatter: value => `$${value.toLocaleString()}`
          }
        },
        series: [
          {
            name: 'Projected revenue',
            type: 'bar',
            barWidth: '6px',
            data: data2,
            barGap: '30%',
            label: { show: false },
            itemStyle: {
              borderRadius: [2, 2, 0, 0],
              color: getColor('primary')
            }
          },
          {
            name: 'Actual revenue',
            type: 'bar',
            data: data1,
            barWidth: '6px',
            barGap: '30%',
            label: { show: false },
            z: 10,
            itemStyle: {
              borderRadius: [2, 2, 0, 0],
              color: getColor('info-100')
            }
          }
        ],
        grid: {
          right: 0,
          left: 3,
          bottom: 0,
          top: '15%',
          containLabel: true
        },
        animation: false
      });

      echartSetOption(chart, userOptions, getDefaultOptions);
    }
  };

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  const leaftletPoints = [
    {
      lat: 53.958332,
      long: -1.080278,
      name: 'Diana Meyer',
      street: 'Slude Strand 27',
      location: '1130 Kobenhavn'
    },
    {
      lat: 52.958332,
      long: -1.080278,
      name: 'Diana Meyer',
      street: 'Slude Strand 27',
      location: '1130 Kobenhavn'
    },
    {
      lat: 51.958332,
      long: -1.080278,
      name: 'Diana Meyer',
      street: 'Slude Strand 27',
      location: '1130 Kobenhavn'
    },
    {
      lat: 53.958332,
      long: -1.080278,
      name: 'Diana Meyer',
      street: 'Slude Strand 27',
      location: '1130 Kobenhavn'
    },
    {
      lat: 54.958332,
      long: -1.080278,
      name: 'Diana Meyer',
      street: 'Slude Strand 27',
      location: '1130 Kobenhavn'
    },
    {
      lat: 55.958332,
      long: -1.080278,
      name: 'Diana Meyer',
      street: 'Slude Strand 27',
      location: '1130 Kobenhavn'
    },
    {
      lat: 53.908332,
      long: -1.080278,
      name: 'Diana Meyer',
      street: 'Slude Strand 27',
      location: '1130 Kobenhavn'
    },
    {
      lat: 53.008332,
      long: -1.080278,
      name: 'Diana Meyer',
      street: 'Slude Strand 27',
      location: '1130 Kobenhavn'
    },
    {
      lat: 53.158332,
      long: -1.080278,
      name: 'Diana Meyer',
      street: 'Slude Strand 27',
      location: '1130 Kobenhavn'
    },
    {
      lat: 53.000032,
      long: -1.080278,
      name: 'Diana Meyer',
      street: 'Slude Strand 27',
      location: '1130 Kobenhavn'
    },
    {
      lat: 52.292001,
      long: -2.22,
      name: 'Anke Schroder',
      street: 'Industrivej 54',
      location: '4140 Borup'
    },
    {
      lat: 52.392001,
      long: -2.22,
      name: 'Anke Schroder',
      street: 'Industrivej 54',
      location: '4140 Borup'
    },
    {
      lat: 51.492001,
      long: -2.22,
      name: 'Anke Schroder',
      street: 'Industrivej 54',
      location: '4140 Borup'
    },
    {
      lat: 51.192001,
      long: -2.22,
      name: 'Anke Schroder',
      street: 'Industrivej 54',
      location: '4140 Borup'
    },
    {
      lat: 52.292001,
      long: -2.22,
      name: 'Anke Schroder',
      street: 'Industrivej 54',
      location: '4140 Borup'
    },
    {
      lat: 54.392001,
      long: -2.22,
      name: 'Anke Schroder',
      street: 'Industrivej 54',
      location: '4140 Borup'
    },
    {
      lat: 51.292001,
      long: -2.22,
      name: 'Anke Schroder',
      street: 'Industrivej 54',
      location: '4140 Borup'
    },
    {
      lat: 52.102001,
      long: -2.22,
      name: 'Anke Schroder',
      street: 'Industrivej 54',
      location: '4140 Borup'
    },
    {
      lat: 52.202001,
      long: -2.22,
      name: 'Anke Schroder',
      street: 'Industrivej 54',
      location: '4140 Borup'
    },
    {
      lat: 51.063202,
      long: -1.308,
      name: 'Tobias Vogel',
      street: 'Mollebakken 33',
      location: '3650 Olstykke'
    },
    {
      lat: 51.363202,
      long: -1.308,
      name: 'Tobias Vogel',
      street: 'Mollebakken 33',
      location: '3650 Olstykke'
    },
    {
      lat: 51.463202,
      long: -1.308,
      name: 'Tobias Vogel',
      street: 'Mollebakken 33',
      location: '3650 Olstykke'
    },
    {
      lat: 51.563202,
      long: -1.308,
      name: 'Tobias Vogel',
      street: 'Mollebakken 33',
      location: '3650 Olstykke'
    },
    {
      lat: 51.763202,
      long: -1.308,
      name: 'Tobias Vogel',
      street: 'Mollebakken 33',
      location: '3650 Olstykke'
    },
    {
      lat: 51.863202,
      long: -1.308,
      name: 'Tobias Vogel',
      street: 'Mollebakken 33',
      location: '3650 Olstykke'
    },
    {
      lat: 51.963202,
      long: -1.308,
      name: 'Tobias Vogel',
      street: 'Mollebakken 33',
      location: '3650 Olstykke'
    },
    {
      lat: 51.000202,
      long: -1.308,
      name: 'Tobias Vogel',
      street: 'Mollebakken 33',
      location: '3650 Olstykke'
    },
    {
      lat: 51.000202,
      long: -1.308,
      name: 'Tobias Vogel',
      street: 'Mollebakken 33',
      location: '3650 Olstykke'
    },
    {
      lat: 51.163202,
      long: -1.308,
      name: 'Tobias Vogel',
      street: 'Mollebakken 33',
      location: '3650 Olstykke'
    },
    {
      lat: 52.263202,
      long: -1.308,
      name: 'Tobias Vogel',
      street: 'Mollebakken 33',
      location: '3650 Olstykke'
    },
    {
      lat: 53.463202,
      long: -1.308,
      name: 'Tobias Vogel',
      street: 'Mollebakken 33',
      location: '3650 Olstykke'
    },
    {
      lat: 55.163202,
      long: -1.308,
      name: 'Tobias Vogel',
      street: 'Mollebakken 33',
      location: '3650 Olstykke'
    },
    {
      lat: 56.263202,
      long: -1.308,
      name: 'Tobias Vogel',
      street: 'Mollebakken 33',
      location: '3650 Olstykke'
    },
    {
      lat: 56.463202,
      long: -1.308,
      name: 'Tobias Vogel',
      street: 'Mollebakken 33',
      location: '3650 Olstykke'
    },
    {
      lat: 56.563202,
      long: -1.308,
      name: 'Tobias Vogel',
      street: 'Mollebakken 33',
      location: '3650 Olstykke'
    },
    {
      lat: 56.663202,
      long: -1.308,
      name: 'Tobias Vogel',
      street: 'Mollebakken 33',
      location: '3650 Olstykke'
    },
    {
      lat: 56.763202,
      long: -1.308,
      name: 'Tobias Vogel',
      street: 'Mollebakken 33',
      location: '3650 Olstykke'
    },
    {
      lat: 56.863202,
      long: -1.308,
      name: 'Tobias Vogel',
      street: 'Mollebakken 33',
      location: '3650 Olstykke'
    },
    {
      lat: 56.963202,
      long: -1.308,
      name: 'Tobias Vogel',
      street: 'Mollebakken 33',
      location: '3650 Olstykke'
    },
    {
      lat: 57.973202,
      long: -1.308,
      name: 'Tobias Vogel',
      street: 'Mollebakken 33',
      location: '3650 Olstykke'
    },
    {
      lat: 57.163202,
      long: -1.308,
      name: 'Tobias Vogel',
      street: 'Mollebakken 33',
      location: '3650 Olstykke'
    },
    {
      lat: 51.163202,
      long: -1.308,
      name: 'Tobias Vogel',
      street: 'Mollebakken 33',
      location: '3650 Olstykke'
    },
    {
      lat: 51.263202,
      long: -1.308,
      name: 'Tobias Vogel',
      street: 'Mollebakken 33',
      location: '3650 Olstykke'
    },
    {
      lat: 51.363202,
      long: -1.308,
      name: 'Tobias Vogel',
      street: 'Mollebakken 33',
      location: '3650 Olstykke'
    },
    {
      lat: 51.409,
      long: -2.647,
      name: 'Richard Hendricks',
      street: '37 Seafield Place',
      location: 'London'
    },
    {
      lat: 53.68,
      long: -1.49,
      name: 'Richard Hendricks',
      street: '37 Seafield Place',
      location: 'London'
    },
    {
      lat: 50.259998,
      long: -5.051,
      name: 'Richard Hendricks',
      street: '37 Seafield Place',
      location: 'London'
    },
    {
      lat: 54.906101,
      long: -1.38113,
      name: 'Richard Hendricks',
      street: '37 Seafield Place',
      location: 'London'
    },
    {
      lat: 53.383331,
      long: -1.466667,
      name: 'Richard Hendricks',
      street: '37 Seafield Place',
      location: 'London'
    },
    {
      lat: 53.483002,
      long: -2.2931,
      name: 'Richard Hendricks',
      street: '37 Seafield Place',
      location: 'London'
    },
    {
      lat: 51.509865,
      long: -0.118092,
      name: 'Richard Hendricks',
      street: '37 Seafield Place',
      location: 'London'
    },
    {
      lat: 51.109865,
      long: -0.118092,
      name: 'Richard Hendricks',
      street: '37 Seafield Place',
      location: 'London'
    },
    {
      lat: 51.209865,
      long: -0.118092,
      name: 'Richard Hendricks',
      street: '37 Seafield Place',
      location: 'London'
    },
    {
      lat: 51.309865,
      long: -0.118092,
      name: 'Richard Hendricks',
      street: '37 Seafield Place',
      location: 'London'
    },
    {
      lat: 51.409865,
      long: -0.118092,
      name: 'Richard Hendricks',
      street: '37 Seafield Place',
      location: 'London'
    },
    {
      lat: 51.609865,
      long: -0.118092,
      name: 'Richard Hendricks',
      street: '37 Seafield Place',
      location: 'London'
    },
    {
      lat: 51.709865,
      long: -0.118092,
      name: 'Richard Hendricks',
      street: '37 Seafield Place',
      location: 'London'
    },
    {
      lat: 51.809865,
      long: -0.118092,
      name: 'Richard Hendricks',
      street: '37 Seafield Place',
      location: 'London'
    },
    {
      lat: 51.909865,
      long: -0.118092,
      name: 'Richard Hendricks',
      street: '37 Seafield Place',
      location: 'London'
    },
    {
      lat: 52.109865,
      long: -0.118092,
      name: 'Richard Hendricks',
      street: '37 Seafield Place',
      location: 'London'
    },
    {
      lat: 52.209865,
      long: -0.118092,
      name: 'Richard Hendricks',
      street: '37 Seafield Place',
      location: 'London'
    },
    {
      lat: 52.309865,
      long: -0.118092,
      name: 'Richard Hendricks',
      street: '37 Seafield Place',
      location: 'London'
    },
    {
      lat: 52.409865,
      long: -0.118092,
      name: 'Richard Hendricks',
      street: '37 Seafield Place',
      location: 'London'
    },
    {
      lat: 52.509865,
      long: -0.118092,
      name: 'Richard Hendricks',
      street: '37 Seafield Place',
      location: 'London'
    },
    {
      lat: 52.609865,
      long: -0.118092,
      name: 'Richard Hendricks',
      street: '37 Seafield Place',
      location: 'London'
    },
    {
      lat: 52.709865,
      long: -0.118092,
      name: 'Richard Hendricks',
      street: '37 Seafield Place',
      location: 'London'
    },
    {
      lat: 52.809865,
      long: -0.118092,
      name: 'Richard Hendricks',
      street: '37 Seafield Place',
      location: 'London'
    },
    {
      lat: 52.909865,
      long: -0.118092,
      name: 'Richard Hendricks',
      street: '37 Seafield Place',
      location: 'London'
    },
    {
      lat: 52.519865,
      long: -0.118092,
      name: 'Richard Hendricks',
      street: '37 Seafield Place',
      location: 'London'
    },
    {
      lat: 52.529865,
      long: -0.118092,
      name: 'Richard Hendricks',
      street: '37 Seafield Place',
      location: 'London'
    },
    {
      lat: 52.539865,
      long: -0.118092,
      name: 'Richard Hendricks',
      street: '37 Seafield Place',
      location: 'London'
    },
    {
      lat: 53.549865,
      long: -0.118092,
      name: 'Richard Hendricks',
      street: '37 Seafield Place',
      location: 'London'
    },
    {
      lat: 52.549865,
      long: -0.118092,
      name: 'Richard Hendricks',
      street: '37 Seafield Place',
      location: 'London'
    },
    {
      lat: 53.109865,
      long: -0.118092,
      name: 'Richard Hendricks',
      street: '37 Seafield Place',
      location: 'London'
    },
    {
      lat: 53.209865,
      long: -0.118092,
      name: 'Richard Hendricks',
      street: '37 Seafield Place',
      location: 'London'
    },
    {
      lat: 53.319865,
      long: -0.118092,
      name: 'Richard Hendricks',
      street: '37 Seafield Place',
      location: 'London'
    },
    {
      lat: 53.329865,
      long: -0.118092,
      name: 'Richard Hendricks',
      street: '37 Seafield Place',
      location: 'London'
    },
    {
      lat: 53.409865,
      long: -0.118092,
      name: 'Richard Hendricks',
      street: '37 Seafield Place',
      location: 'London'
    },
    {
      lat: 53.559865,
      long: -0.118092,
      name: 'Richard Hendricks',
      street: '37 Seafield Place',
      location: 'London'
    },
    {
      lat: 53.619865,
      long: -0.118092,
      name: 'Richard Hendricks',
      street: '37 Seafield Place',
      location: 'London'
    },
    {
      lat: 53.629865,
      long: -0.118092,
      name: 'Richard Hendricks',
      street: '37 Seafield Place',
      location: 'London'
    },
    {
      lat: 53.639865,
      long: -0.118092,
      name: 'Richard Hendricks',
      street: '37 Seafield Place',
      location: 'London'
    },
    {
      lat: 53.649865,
      long: -0.118092,
      name: 'Richard Hendricks',
      street: '37 Seafield Place',
      location: 'London'
    },
    {
      lat: 53.669865,
      long: -0.118092,
      name: 'Richard Hendricks',
      street: '37 Seafield Place',
      location: 'London'
    },
    {
      lat: 53.669865,
      long: -0.118092,
      name: 'Richard Hendricks',
      street: '37 Seafield Place',
      location: 'London'
    },
    {
      lat: 53.719865,
      long: -0.118092,
      name: 'Richard Hendricks',
      street: '37 Seafield Place',
      location: 'London'
    },
    {
      lat: 53.739865,
      long: -0.118092,
      name: 'Richard Hendricks',
      street: '37 Seafield Place',
      location: 'London'
    },
    {
      lat: 53.749865,
      long: -0.118092,
      name: 'Richard Hendricks',
      street: '37 Seafield Place',
      location: 'London'
    },
    {
      lat: 53.759865,
      long: -0.118092,
      name: 'Richard Hendricks',
      street: '37 Seafield Place',
      location: 'London'
    },
    {
      lat: 53.769865,
      long: -0.118092,
      name: 'Richard Hendricks',
      street: '37 Seafield Place',
      location: 'London'
    },
    {
      lat: 53.769865,
      long: -0.118092,
      name: 'Richard Hendricks',
      street: '37 Seafield Place',
      location: 'London'
    },
    {
      lat: 53.819865,
      long: -0.118092,
      name: 'Richard Hendricks',
      street: '37 Seafield Place',
      location: 'London'
    },
    {
      lat: 53.829865,
      long: -0.118092,
      name: 'Richard Hendricks',
      street: '37 Seafield Place',
      location: 'London'
    },
    {
      lat: 53.483959,
      long: -2.244644,
      name: 'Ethel B. Brooks',
      street: '2576 Sun Valley Road'
    },
    {
      lat: 40.737,
      long: -73.923,
      name: 'Marshall D. Lewis',
      street: '1489 Michigan Avenue',
      location: 'Michigan'
    },
    {
      lat: 39.737,
      long: -73.923,
      name: 'Marshall D. Lewis',
      street: '1489 Michigan Avenue',
      location: 'Michigan'
    },
    {
      lat: 38.737,
      long: -73.923,
      name: 'Marshall D. Lewis',
      street: '1489 Michigan Avenue',
      location: 'Michigan'
    },
    {
      lat: 37.737,
      long: -73.923,
      name: 'Marshall D. Lewis',
      street: '1489 Michigan Avenue',
      location: 'Michigan'
    },
    {
      lat: 40.737,
      long: -73.923,
      name: 'Marshall D. Lewis',
      street: '1489 Michigan Avenue',
      location: 'Michigan'
    },
    {
      lat: 41.737,
      long: -73.923,
      name: 'Marshall D. Lewis',
      street: '1489 Michigan Avenue',
      location: 'Michigan'
    },
    {
      lat: 42.737,
      long: -73.923,
      name: 'Marshall D. Lewis',
      street: '1489 Michigan Avenue',
      location: 'Michigan'
    },
    {
      lat: 43.737,
      long: -73.923,
      name: 'Marshall D. Lewis',
      street: '1489 Michigan Avenue',
      location: 'Michigan'
    },
    {
      lat: 44.737,
      long: -73.923,
      name: 'Marshall D. Lewis',
      street: '1489 Michigan Avenue',
      location: 'Michigan'
    },
    {
      lat: 45.737,
      long: -73.923,
      name: 'Marshall D. Lewis',
      street: '1489 Michigan Avenue',
      location: 'Michigan'
    },
    {
      lat: 46.7128,
      long: 74.006,
      name: 'Elizabeth C. Lyons',
      street: '4553 Kenwood Place',
      location: 'Fort Lauderdale'
    },
    {
      lat: 40.7128,
      long: 74.1181,
      name: 'Elizabeth C. Lyons',
      street: '4553 Kenwood Place',
      location: 'Fort Lauderdale'
    },
    {
      lat: 14.235,
      long: 51.9253,
      name: 'Ralph D. Wylie',
      street: '3186 Levy Court',
      location: 'North Reading'
    },
    {
      lat: 15.235,
      long: 51.9253,
      name: 'Ralph D. Wylie',
      street: '3186 Levy Court',
      location: 'North Reading'
    },
    {
      lat: 16.235,
      long: 51.9253,
      name: 'Ralph D. Wylie',
      street: '3186 Levy Court',
      location: 'North Reading'
    },
    {
      lat: 14.235,
      long: 51.9253,
      name: 'Ralph D. Wylie',
      street: '3186 Levy Court',
      location: 'North Reading'
    },
    {
      lat: 15.8267,
      long: 47.9218,
      name: 'Hope A. Atkins',
      street: '3715 Hillcrest Drive',
      location: 'Seattle'
    },
    {
      lat: 15.9267,
      long: 47.9218,
      name: 'Hope A. Atkins',
      street: '3715 Hillcrest Drive',
      location: 'Seattle'
    },
    {
      lat: 23.4425,
      long: 58.4438,
      name: 'Samuel R. Bailey',
      street: '2883 Raoul Wallenberg Place',
      location: 'Cheshire'
    },
    {
      lat: 23.5425,
      long: 58.3438,
      name: 'Samuel R. Bailey',
      street: '2883 Raoul Wallenberg Place',
      location: 'Cheshire'
    },
    {
      lat: -37.8927369333,
      long: 175.4087452333,
      name: 'Samuel R. Bailey',
      street: '3228 Glory Road',
      location: 'Nashville'
    },
    {
      lat: -38.9064188833,
      long: 175.4441556833,
      name: 'Samuel R. Bailey',
      street: '3228 Glory Road',
      location: 'Nashville'
    },
    {
      lat: -12.409874,
      long: -65.596832,
      name: 'Ann J. Perdue',
      street: '921 Ella Street',
      location: 'Dublin'
    },
    {
      lat: -22.090887,
      long: -57.411827,
      name: 'Jorge C. Woods',
      street: '4800 North Bend River Road',
      location: 'Allen'
    },
    {
      lat: -19.019585,
      long: -65.261963,
      name: 'Russ E. Panek',
      street: '4068 Hartland Avenue',
      location: 'Appleton'
    },
    {
      lat: -16.500093,
      long: -68.214684,
      name: 'Russ E. Panek',
      street: '4068 Hartland Avenue',
      location: 'Appleton'
    },
    {
      lat: -17.413977,
      long: -66.165321,
      name: 'Russ E. Panek',
      street: '4068 Hartland Avenue',
      location: 'Appleton'
    },
    {
      lat: -16.489689,
      long: -68.119293,
      name: 'Russ E. Panek',
      street: '4068 Hartland Avenue',
      location: 'Appleton'
    },
    {
      lat: 54.766323,
      long: 3.08603729,
      name: 'Russ E. Panek',
      street: '4068 Hartland Avenue',
      location: 'Appleton'
    },
    {
      lat: 54.866323,
      long: 3.08603729,
      name: 'Russ E. Panek',
      street: '4068 Hartland Avenue',
      location: 'Appleton'
    },
    {
      lat: 49.537685,
      long: 3.08603729,
      name: 'Russ E. Panek',
      street: '4068 Hartland Avenue',
      location: 'Appleton'
    },
    {
      lat: 54.715424,
      long: 0.509207,
      name: 'Russ E. Panek',
      street: '4068 Hartland Avenue',
      location: 'Appleton'
    },
    {
      lat: 44.891666,
      long: 10.136665,
      name: 'Russ E. Panek',
      street: '4068 Hartland Avenue',
      location: 'Appleton'
    },
    {
      lat: 48.078335,
      long: 14.535004,
      name: 'Russ E. Panek',
      street: '4068 Hartland Avenue',
      location: 'Appleton'
    },
    {
      lat: -26.358055,
      long: 27.398056,
      name: 'Russ E. Panek',
      street: '4068 Hartland Avenue',
      location: 'Appleton'
    },
    {
      lat: -29.1,
      long: 26.2167,
      name: 'Wilbur J. Dry',
      street: '2043 Jadewood Drive',
      location: 'Northbrook'
    },
    {
      lat: -29.883333,
      long: 31.049999,
      name: 'Wilbur J. Dry',
      street: '2043 Jadewood Drive',
      location: 'Northbrook'
    },
    {
      lat: -26.266111,
      long: 27.865833,
      name: 'Wilbur J. Dry',
      street: '2043 Jadewood Drive',
      location: 'Northbrook'
    },
    {
      lat: -29.087217,
      long: 26.154898,
      name: 'Wilbur J. Dry',
      street: '2043 Jadewood Drive',
      location: 'Northbrook'
    },
    {
      lat: -33.958252,
      long: 25.619022,
      name: 'Wilbur J. Dry',
      street: '2043 Jadewood Drive',
      location: 'Northbrook'
    },
    {
      lat: -33.977074,
      long: 22.457581,
      name: 'Wilbur J. Dry',
      street: '2043 Jadewood Drive',
      location: 'Northbrook'
    },
    {
      lat: -26.563404,
      long: 27.844164,
      name: 'Wilbur J. Dry',
      street: '2043 Jadewood Drive',
      location: 'Northbrook'
    },
    {
      lat: 51.21389,
      long: -102.462776,
      name: 'Joseph B. Poole',
      street: '3364 Lunetta Street',
      location: 'Wichita Falls'
    },
    {
      lat: 52.321945,
      long: -106.584167,
      name: 'Joseph B. Poole',
      street: '3364 Lunetta Street',
      location: 'Wichita Falls'
    },
    {
      lat: 50.288055,
      long: -107.793892,
      name: 'Joseph B. Poole',
      street: '3364 Lunetta Street',
      location: 'Wichita Falls'
    },
    {
      lat: 52.7575,
      long: -108.28611,
      name: 'Joseph B. Poole',
      street: '3364 Lunetta Street',
      location: 'Wichita Falls'
    },
    {
      lat: 50.393333,
      long: -105.551941,
      name: 'Joseph B. Poole',
      street: '3364 Lunetta Street',
      location: 'Wichita Falls'
    },
    {
      lat: 50.930557,
      long: -102.807777,
      name: 'Joseph B. Poole',
      street: '3364 Lunetta Street',
      location: 'Wichita Falls'
    },
    {
      lat: 52.856388,
      long: -104.610001,
      name: 'Joseph B. Poole',
      street: '3364 Lunetta Street',
      location: 'Wichita Falls'
    },
    {
      lat: 52.289722,
      long: -106.666664,
      name: 'Joseph B. Poole',
      street: '3364 Lunetta Street',
      location: 'Wichita Falls'
    },
    {
      lat: 52.201942,
      long: -105.123055,
      name: 'Joseph B. Poole',
      street: '3364 Lunetta Street',
      location: 'Wichita Falls'
    },
    {
      lat: 53.278046,
      long: -110.00547,
      name: 'Joseph B. Poole',
      street: '3364 Lunetta Street',
      location: 'Wichita Falls'
    },
    {
      lat: 49.13673,
      long: -102.990959,
      name: 'Joseph B. Poole',
      street: '3364 Lunetta Street',
      location: 'Wichita Falls'
    },
    {
      lat: 45.484531,
      long: -73.597023,
      name: 'Claudette D. Nowakowski',
      street: '3742 Farland Avenue',
      location: 'San Antonio'
    },
    {
      lat: 45.266666,
      long: -71.900002,
      name: 'Claudette D. Nowakowski',
      street: '3742 Farland Avenue',
      location: 'San Antonio'
    },
    {
      lat: 45.349998,
      long: -72.51667,
      name: 'Claudette D. Nowakowski',
      street: '3742 Farland Avenue',
      location: 'San Antonio'
    },
    {
      lat: 47.333332,
      long: -79.433334,
      name: 'Claudette D. Nowakowski',
      street: '3742 Farland Avenue',
      location: 'San Antonio'
    },
    {
      lat: 45.400002,
      long: -74.033333,
      name: 'Claudette D. Nowakowski',
      street: '3742 Farland Avenue',
      location: 'San Antonio'
    },
    {
      lat: 45.683334,
      long: -73.433334,
      name: 'Claudette D. Nowakowski',
      street: '3742 Farland Avenue',
      location: 'San Antonio'
    },
    {
      lat: 48.099998,
      long: -77.783333,
      name: 'Claudette D. Nowakowski',
      street: '3742 Farland Avenue',
      location: 'San Antonio'
    },
    {
      lat: 45.5,
      long: -72.316666,
      name: 'Claudette D. Nowakowski',
      street: '3742 Farland Avenue',
      location: 'San Antonio'
    },
    {
      lat: 46.349998,
      long: -72.550003,
      name: 'Claudette D. Nowakowski',
      street: '3742 Farland Avenue',
      location: 'San Antonio'
    },
    {
      lat: 48.119999,
      long: -69.18,
      name: 'Claudette D. Nowakowski',
      street: '3742 Farland Avenue',
      location: 'San Antonio'
    },
    {
      lat: 45.599998,
      long: -75.25,
      name: 'Claudette D. Nowakowski',
      street: '3742 Farland Avenue',
      location: 'San Antonio'
    },
    {
      lat: 46.099998,
      long: -71.300003,
      name: 'Claudette D. Nowakowski',
      street: '3742 Farland Avenue',
      location: 'San Antonio'
    },
    {
      lat: 45.700001,
      long: -73.633331,
      name: 'Claudette D. Nowakowski',
      street: '3742 Farland Avenue',
      location: 'San Antonio'
    },
    {
      lat: 47.68,
      long: -68.879997,
      name: 'Claudette D. Nowakowski',
      street: '3742 Farland Avenue',
      location: 'San Antonio'
    },
    {
      lat: 46.716667,
      long: -79.099998,
      name: '299'
    },
    {
      lat: 45.016666,
      long: -72.099998,
      name: '299'
    }
  ];

  /* -------------------------------------------------------------------------- */
  /*                     Echart Bar Member info                                 */
  /* -------------------------------------------------------------------------- */
  const { echarts: echarts$1 } = window;

  const returningCustomerChartInit = () => {
    const { getColor, getData } = window.phoenix.utils;

    const $returningCustomerChart = document.querySelector(
      '.echart-returning-customer'
    );

    if ($returningCustomerChart) {
      const userOptions = getData($returningCustomerChart, 'echarts');
      const chart = echarts$1.init($returningCustomerChart);
      const getDefaultOptions = () => ({
        color: getColor('gray-100'),
        legend: {
          data: [
            {
              name: 'Fourth time',
              icon: 'roundRect',
              itemStyle: {
                color: getColor('primary-300'),
                borderWidth: 0
              }
            },
            {
              name: 'Third time',
              icon: 'roundRect',
              itemStyle: { color: getColor('info-200'), borderWidth: 0 }
            },
            {
              name: 'Second time',
              icon: 'roundRect',
              itemStyle: { color: getColor('primary'), borderWidth: 0 }
            }
          ],

          right: 'right',
          width: '100%',
          itemWidth: 16,
          itemHeight: 8,
          itemGap: 20,
          top: 3,
          inactiveColor: getColor('gray-500'),
          inactiveBorderWidth: 0,
          textStyle: {
            color: getColor('gray-900'),
            fontWeight: 600,
            fontFamily: 'Nunito Sans'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'none'
          },
          padding: [7, 10],
          backgroundColor: getColor('gray-100'),
          borderColor: getColor('gray-300'),
          textStyle: { color: getColor('dark') },
          borderWidth: 1,
          transitionDuration: 0,
          formatter: tooltipFormatter
        },
        xAxis: {
          type: 'category',
          data: months,
          show: true,
          boundaryGap: false,
          axisLine: {
            show: true,
            lineStyle: { color: getColor('gray-300') }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            // interval: 1,
            showMinLabel: false,
            showMaxLabel: false,
            color: getColor('gray-800'),
            formatter: value => value.slice(0, 3),
            fontFamily: 'Nunito Sans',
            fontWeight: 600,
            fontSize: 12.8
          },
          splitLine: {
            show: true,
            lineStyle: { color: getColor('gray-200'), type: 'dashed' }
          }
        },
        yAxis: {
          type: 'value',
          boundaryGap: false,
          axisLabel: {
            showMinLabel: true,
            showMaxLabel: true,
            color: getColor('gray-800'),
            formatter: value => `${value}%`,
            fontFamily: 'Nunito Sans',
            fontWeight: 600,
            fontSize: 12.8
          },
          splitLine: {
            show: true,
            lineStyle: { color: getColor('gray-200') }
          }
        },
        series: [
          {
            name: 'Fourth time',
            type: 'line',
            data: [62, 90, 90, 90, 78, 84, 17, 17, 17, 17, 82, 95],
            showSymbol: false,
            symbol: 'circle',
            symbolSize: 10,
            emphasis: {
              lineStyle: {
                width: 1
              }
            },
            lineStyle: {
              type: 'dashed',
              width: 1,
              color: getColor('primary-300')
            },
            itemStyle: {
              borderColor: getColor('primary-300'),
              borderWidth: 3
            }
          },
          {
            name: 'Third time',
            type: 'line',
            data: [50, 50, 30, 62, 18, 70, 70, 22, 70, 70, 70, 70],
            showSymbol: false,
            symbol: 'circle',
            symbolSize: 10,
            emphasis: {
              lineStyle: {
                width: 1
              }
            },
            lineStyle: {
              width: 1,
              color: getColor('info-200')
            },
            itemStyle: {
              borderColor: getColor('info-200'),
              borderWidth: 3
            }
          },
          {
            name: 'Second time',
            type: 'line',
            data: [40, 78, 60, 78, 60, 20, 60, 40, 60, 40, 20, 78],
            showSymbol: false,
            symbol: 'circle',
            symbolSize: 10,
            emphasis: {
              lineStyle: {
                width: 3
              }
            },
            lineStyle: {
              width: 3,
              color: getColor('primary')
            },
            itemStyle: {
              borderColor: getColor('primary'),
              borderWidth: 3
            }
          }
        ],
        grid: { left: 0, right: 8, top: '14%', bottom: 0, containLabel: true }
      });
      echartSetOption(chart, userOptions, getDefaultOptions);
    }
  };

  // import * as echarts from 'echarts';

  const { echarts } = window;

  /* -------------------------------------------------------------------------- */
  /*                                Market Share                                */
  /* -------------------------------------------------------------------------- */

  const topCouponsChartInit = () => {
    const { getData, getColor } = window.phoenix.utils;
    const ECHART_TOP_COUPONS = '.echart-top-coupons';
    const $echartTopCoupons = document.querySelector(ECHART_TOP_COUPONS);

    if ($echartTopCoupons) {
      const userOptions = getData($echartTopCoupons, 'options');
      const chart = echarts.init($echartTopCoupons);

      const getDefaultOptions = () => ({
        color: [
          getColor('primary'),
          getColor('primary-200'),
          getColor('info-500')
        ],

        tooltip: {
          trigger: 'item',
          padding: [7, 10],
          backgroundColor: getColor('gray-100'),
          borderColor: getColor('gray-300'),
          textStyle: { color: getColor('dark') },
          borderWidth: 1,
          transitionDuration: 0,
          position(pos, params, el, elRect, size) {
            const obj = { top: pos[1] - 35 }; // set tooltip position over 35px from pointer
            if (window.innerWidth > 540) {
              if (pos[0] <= size.viewSize[0] / 2) {
                obj.left = pos[0] + 20; // 'move in right';
              } else {
                obj.left = pos[0] - size.contentSize[0] - 20;
              }
            } else {
              obj[pos[0] < size.viewSize[0] / 2 ? 'left' : 'right'] = 0;
            }
            return obj;
          },
          formatter: params => {
            return `<strong>${params.data.name}:</strong> ${params.percent}%`;
          }
        },
        legend: { show: false },
        series: [
          {
            name: '72%',
            type: 'pie',
            radius: ['100%', '87%'],
            avoidLabelOverlap: false,
            emphasis: {
              scale: false,
              itemStyle: {
                color: 'inherit'
              }
            },
            itemStyle: {
              borderWidth: 2,
              borderColor: getColor('gray-soft')
            },
            label: {
              show: true,
              position: 'center',
              formatter: '{a}',
              fontSize: 23,
              color: getColor('dark')
            },
            data: [
              { value: 7200000, name: 'Percentage discount' },
              { value: 1800000, name: 'Fixed card discount' },
              { value: 1000000, name: 'Fixed product discount' }
            ]
          }
        ],
        grid: { containLabel: true }
      });

      echartSetOption(chart, userOptions, getDefaultOptions);
    }
  };

  // dayjs.extend(advancedFormat);

  /* -------------------------------------------------------------------------- */
  /*                             Echarts Total Sales                            */
  /* -------------------------------------------------------------------------- */

  const totalOrdersChartInit = () => {
    const { getColor, getData, getDates } = window.phoenix.utils;
    const totalOrdersChartEl = document.querySelector('.echart-total-orders');

    if (totalOrdersChartEl) {
      const userOptions = getData(totalOrdersChartEl, 'echarts');
      const chart = window.echarts.init(totalOrdersChartEl);

      const getDefaultOptions = () => ({
        color: getColor('primary'),
        tooltip: {
          trigger: 'item',
          padding: [7, 10],
          backgroundColor: getColor('gray-100'),
          borderColor: getColor('gray-300'),
          textStyle: { color: getColor('dark') },
          position: (...params) => handleTooltipPosition(params),
          borderWidth: 1,
          transitionDuration: 0,
          formatter: params => {
            return `<strong>${window
            .dayjs(params.name)
            .format('DD MMM')}:</strong> ${params.value}`;
          }
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
            lineStyle: { color: getColor('gray-200') }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            formatter: value => window.dayjs(value).format('DD MMM'),
            interval: 6,
            showMinLabel: true,
            showMaxLabel: true,
            color: getColor('gray-800')
          }
        },
        yAxis: {
          show: false,
          type: 'value',
          boundaryGap: false
        },
        series: [
          {
            type: 'bar',
            barWidth: '5px',
            data: [120, 200, 150, 80, 70, 110, 120],
            showBackground: true,
            symbol: 'none',
            itemStyle: {
              borderRadius: 10
            },
            backgroundStyle: {
              borderRadius: 10,
              color: getColor('primary-100')
            }
          }
        ],
        grid: { right: 10, left: 10, bottom: 0, top: 0 }
      });

      echartSetOption(chart, userOptions, getDefaultOptions);
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                             Echarts Total Sales                            */
  /* -------------------------------------------------------------------------- */

  const totalSalesChartInit = () => {
    const { getColor, getData, getDates } = window.phoenix.utils;
    const $totalSalesChart = document.querySelector('.echart-total-sales-chart');

    // getItemFromStore('phoenixTheme')

    const dates = getDates(
      new Date('5/1/2022'),
      new Date('5/30/2022'),
      1000 * 60 * 60 * 24
    );

    const currentMonthData = [
      100, 200, 300, 300, 300, 250, 200, 200, 200, 200, 200, 500, 500, 500, 600,
      700, 800, 900, 1000, 1100, 850, 600, 600, 600, 400, 200, 200, 300, 300, 300
    ];

    const prevMonthData = [
      200, 200, 100, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 200, 400, 600,
      600, 600, 800, 1000, 700, 400, 450, 500, 600, 700, 650, 600, 550
    ];

    const tooltipFormatter = params => {
      const currentDate = window.dayjs(params[0].axisValue);
      const prevDate = window.dayjs(params[0].axisValue).subtract(1, 'month');

      const result = params.map((param, index) => ({
        value: param.value,
        date: index > 0 ? prevDate : currentDate,
        color: param.color
      }));

      let tooltipItem = ``;
      result.forEach((el, index) => {
        tooltipItem += `<h6 class="fs--1 text-700 ${
        index > 0 && 'mb-0'
      }"><span class="fas fa-circle me-2" style="color:${el.color}"></span>
      ${el.date.format('MMM DD')} : ${el.value}
    </h6>`;
      });
      return `<div class='ms-1'>
              ${tooltipItem}
            </div>`;
    };

    if ($totalSalesChart) {
      const userOptions = getData($totalSalesChart, 'echarts');
      const chart = window.echarts.init($totalSalesChart);

      const getDefaultOptions = () => ({
        color: [getColor('primary'), getColor('info')],
        tooltip: {
          trigger: 'axis',
          padding: 10,
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
        xAxis: [
          {
            type: 'category',
            data: dates,
            axisLabel: {
              formatter: value => window.dayjs(value).format('DD MMM'),
              interval: 13,
              showMinLabel: true,
              showMaxLabel: false,
              color: getColor('gray-800'),
              align: 'left',
              fontFamily: 'Nunito Sans',
              fontWeight: 600,
              fontSize: 12.8
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: getColor('gray-200')
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: true,
              interval: 0,
              lineStyle: {
                color:
                  window.config.config.phoenixTheme === 'dark'
                    ? getColor('gray-100')
                    : getColor('gray-200')
              }
            },
            boundaryGap: false
          },
          {
            type: 'category',
            position: 'bottom',
            data: dates,
            axisLabel: {
              formatter: value => window.dayjs(value).format('DD MMM'),
              interval: 130,
              showMaxLabel: true,
              showMinLabel: false,
              color: getColor('gray-800'),
              align: 'right',
              fontFamily: 'Nunito Sans',
              fontWeight: 600,
              fontSize: 12.8
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            boundaryGap: false
          }
        ],
        yAxis: {
          position: 'right',
          axisPointer: { type: 'none' },
          axisTick: 'none',
          splitLine: {
            show: false
          },
          axisLine: { show: false },
          axisLabel: { show: false }
        },
        series: [
          {
            name: 'd',
            type: 'line',
            // data: Array.from(Array(30).keys()).map(() =>
            //   getRandomNumber(100, 300)
            // ),
            data: currentMonthData,
            showSymbol: false,
            symbol: 'circle'
          },
          {
            name: 'e',
            type: 'line',
            // data: Array.from(Array(30).keys()).map(() =>
            //   getRandomNumber(100, 300)
            // ),
            data: prevMonthData,
            // symbol: 'none',
            lineStyle: {
              type: 'dashed',
              width: 1,
              color: getColor('info')
            },
            showSymbol: false,
            symbol: 'circle'
          }
        ],
        grid: {
          right: 2,
          left: 5,
          bottom: '20px',
          top: '2%',
          containLabel: false
        },
        animation: false
      });
      echartSetOption(chart, userOptions, getDefaultOptions);
    }
  };

  const { L } = window;

  /* -------------------------------------------------------------------------- */
  /*                                   leaflet                                  */
  /* -------------------------------------------------------------------------- */

  const leafletTopRegionsInit = () => {
    const mapContainer = document.getElementById('map');
    if (L && mapContainer) {
      const getFilterColor = () => {
        return window.config.config.phoenixTheme === 'dark'
          ? [
              'invert:98%',
              'grayscale:69%',
              'bright:89%',
              'contrast:111%',
              'hue:205deg',
              'saturate:1000%'
            ]
          : ['bright:101%', 'contrast:101%', 'hue:23deg', 'saturate:225%'];
      };
      const tileLayerTheme =
        'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';

      const tiles = L.tileLayer.colorFilter(tileLayerTheme, {
        attribution: null,
        transparent: true,
        filter: getFilterColor()
      });

      const map = L.map('map', {
        center: L.latLng(25.659195, 30.182691),
        zoom: 0.6,
        layers: [tiles],
        minZoom: 1.4
      });

      const mcg = L.markerClusterGroup({
        chunkedLoading: false,
        spiderfyOnMaxZoom: false
      });

      leaftletPoints.map(point => {
        const { name, location, street } = point;
        const icon = L.icon({
          iconUrl: `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAACXBIWXMAAAFgAAABYAEg2RPaAAADpElEQVRYCZ1XS1LbQBBtybIdiMEJKSpUqihgEW/xDdARyAnirOIl3MBH8NK7mBvkBpFv4Gy9IRSpFIQiRPyNfqkeZkY9HwmFt7Lm06+7p/vN2MmyDIrQ6QebALAHAD4AbFuWfQeAAACGs5H/w5jlsJJw4wMA+GhMFuMA99jIDJJOP+ihZwDQFmNuowWO1wS3viDXpdEdZPEc0odruj0EgN5s5H8tJOEEX8R3rbkMtcU34NTqhe5nSQTJ7Tkk80s6/Gk28scGiULguFBffgdufdEwWoQ0uoXo8hdAlooVH0REjISfwZSlyHGh0V5n6aHAtKTxXI5g6nQnMH0P4bEgwtR18Yw8Pj8QZ4ARUAI0Hl+fQZZGisGEBVwHr7XKzox57DXZ/ij8Cdwe2u057z9/wygOxRl4S2vSUHx1oucaMQGAHTrgtdag9mK5aN+Wx/uAAQ9Zenp/SRce4TpaNbQK4+sTcGqeTB/aIXv3XN5oj2VKqii++U0JunpZ8urxee4hvjqVc2hHpBDXuKKT9XMgVYJ1/1fPGSeaikzgmWWkMIi9bVf8UhotXxzORn5gWFchI8QyttlzjS0qpsaIGY2MMsujV/AUSdcY0dDpB6/EiOPYzclR1CI5mOez3ekHvrFLxa7cR5pTscfrXjk0Vhm5V2PqLUWnH3R5GbPGpMVD7E1ckXesKBQ7AS/vmQ1c0+kHuxpBj98lTCm8pbc5QRJRdZ6qHb/wGryXq3Lxszv+5gySuwvxueXySwYvHEjuQ9ofTGKYlrmK1EsCHMd5SoD7mZ1HHFCBHLNbMEshvrugqWLn01hpVVJhFgVGkDvK7hR6n2B+d9C7xsqWsbkqHv4cCsWezEb+o2SR+SFweUBxfA5wH7kShjKt2vWL57Px3GhIFEezkb8pxvUWHYhotAfCk2AtkEcxoOttrxUWDR5svb1emSQKj0WXK1HYIgFREbiBqmoZcB2RkbE+byMZiosorVgAZF1ID7yQhEs38wa7nUqNDezdlavC2HbBGSQkGgZ8uJVBmzeiKCRRpEa9ilWghORVeGB7BxeSKF5xqbFBkxBrFKUk/JHA7ppENQaCnCjthK+3opCEYyANztXmZN858cDYWSUSHk3A311GAZDvo6deNKUk1EsqnJoQlkYBNlmxQZeaMgmxoUokICoHDce351RCCiuKoirJWEgNOYvQplM2VCLhUqF7jf94rW9kHVUjQeheV4riv0i4ZOzzz/2y/+0KAOAfr4EE4HpCFhwAAAAASUVORK5CYII=`
        });
        const marker = L.marker([point.lat, point.long], {
          icon
        });
        const popupContent = `
        <h6 class="mb-1">${name}</h6>
        <p class="m-0 text-500">${street}, ${location}</p>
      `;
        const popup = L.popup({ minWidth: 180 }).setContent(popupContent);
        marker.bindPopup(popup);
        mcg.addLayer(marker);
        return true;
      });
      map.addLayer(mcg);

      const themeController = document.body;
      themeController.addEventListener(
        'clickControl',
        ({ detail: { control, value } }) => {
          if (control === 'phoenixTheme') {
            tiles.updateFilter(
              value === 'dark'
                ? [
                    'invert:98%',
                    'grayscale:69%',
                    'bright:89%',
                    'contrast:111%',
                    'hue:205deg',
                    'saturate:1000%'
                  ]
                : ['bright:101%', 'contrast:101%', 'hue:23deg', 'saturate:225%']
            );
          }
        }
      );
    }
  };

  /* eslint-disable no-nested-ternary */
  /*-----------------------------------------------
  |   Gooogle Map
  -----------------------------------------------*/

  const revenueMapInit = () => {
    const themeController = document.body;
    const $googlemaps = document.querySelectorAll('.revenue-map');
    if ($googlemaps.length && window.google) {
      // Visit https://snazzymaps.com/ for more themes
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
        const mapElement = itm;
        const mapOptions = {
          zoom: 1.4,
          minZoom: 1.4,
          zoomControl: false,
          scrollwheel: true,
          disableDefaultUI: true,
          center: new window.google.maps.LatLng(25.659195, 30.182691),
          // styles: mapStyles.SnazzyCustomLight
          styles:
            window.config.config.phoenixTheme === 'dark'
              ? mapStyles.SnazzyCustomDark
              : mapStyles.SnazzyCustomLight
        };

        const map = new window.google.maps.Map(mapElement, mapOptions);
        const infoWindow = new window.google.maps.InfoWindow();

        const markers = leaftletPoints.map(point => {
          const { name, location, street } = point;

          const label = `
        <h6 class="mb-1">${name}</h6>
        <p class="m-0 text-500">${street}, ${location}</p>
      `;
          const marker = new window.google.maps.Marker({
            position: { lat: point.lat, lng: point.lng }
          });

          marker.addListener('click', () => {
            infoWindow.setContent(label);
            infoWindow.open(map, marker);
          });
          return marker;
        });

        const renderer = {
          render: ({ count, position }) => {
            let color = '#3874ff';
            if (count > 10) {
              color = '#e5780b';
            }
            if (count > 90) {
              color = '#25b003';
            }

            const svg = window.btoa(`
            <svg fill="${color}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240">
              <circle cx="120" cy="120" opacity=".9" r="70" />
              <circle cx="120" cy="120" opacity=".3" r="90" />
              <circle cx="120" cy="120" opacity=".2" r="110" />
            </svg>`);

            return new window.google.maps.Marker({
              label: { text: String(count), color: 'white', fontSize: '10px' },
              position,
              icon: {
                url: `data:image/svg+xml;base64,${svg}`,
                scaledSize: new window.google.maps.Size(45, 45)
              },
              // adjust zIndex to be above other markers
              zIndex: Number(window.google.maps.Marker.MAX_ZINDEX) + count
            });
          }
        };

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
        return new window.markerClusterer.MarkerClusterer({
          markers,
          map,
          renderer
        });
      });
    }
  };

  const { docReady } = window.phoenix.utils;

  window.revenueMapInit = revenueMapInit;
  docReady(totalSalesChartInit);
  docReady(newCustomersChartsInit);
  docReady(topCouponsChartInit);
  docReady(projectionVsActualChartInit);
  docReady(returningCustomerChartInit);
  docReady(payingCustomerChartInit);
  docReady(totalOrdersChartInit);
  docReady(leafletTopRegionsInit);

}));
//# sourceMappingURL=ecommerce-dashboard.js.map

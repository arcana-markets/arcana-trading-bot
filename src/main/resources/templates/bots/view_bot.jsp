<!DOCTYPE html>
<html lang="en-US" dir="ltr">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">


    <!-- ===============================================-->
    <!--    Document Title-->
    <!-- ===============================================-->
    <title>Arcana Markets</title>

    <!-- ===============================================-->
    <!--    Favicons-->
    <!-- ===============================================-->
    <link rel="apple-touch-icon" sizes="180x180" href="/static/img/favicons/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/static/img/favicons/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/static/img/favicons/favicon-16x16.png">
    <link rel="shortcut icon" type="image/x-icon" href="/static/img/favicons/favicon.ico">
    <link rel="manifest" href="/static/img/favicons/manifest.json">
    <meta name="msapplication-TileImage" content="/static/img/favicons/mstile-150x150.png">
    <meta name="theme-color" content="#ffffff">
    <script src="/static/vendors/imagesloaded/imagesloaded.pkgd.min.js"></script>
    <script src="/static/vendors/simplebar/simplebar.min.js"></script>
    <script src="/static/js/config.js"></script>

    <!-- ===============================================-->
    <!--    Stylesheets-->
    <!-- ===============================================-->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="">
    <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;400;600;700;800;900&amp;display=swap" rel="stylesheet">
    <link href="/static/vendors/simplebar/simplebar.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.8/css/line.css">
    <link href="/static/css/theme.min.css" type="text/css" rel="stylesheet" id="style-default">


    <!-- inlined vars from controller -->
    <script th:inline="javascript">
        /*<![CDATA[*/
        var initialMarketId = /*[[${marketId}]]*/ '';
        var defaultTokenId = /*[[${defaultTokenId}]]*/ '';
        /*]]>*/


        $(document).ready(function () {
            var options = $("#tokenSelect option");                    // Collect options
            options.detach().sort(function (a, b) {               // Detach from select, then Sort
                var at = $(a).data("rank");
                var bt = $(b).data("rank");
                return (at > bt) ? 1 : ((at < bt) ? -1 : 0);            // Tell the sort function how to order
            });
            options.appendTo("#tokenSelect");                          // Re-attach to select
            $("#tokenSelect").val($("#tokenSelect option:first").val());
            $("#tokenSelect").show();

            $('#tokenSelect').select2({
                templateResult: formatToken,
                templateSelection: formatToken
            });

            // todo - async?
            loadMarkets(defaultTokenId);
            setMarket(initialMarketId);
            updateDepthChart();
        });
    </script>
</head>

<body>
<!-- ===============================================-->
<!--    Main Content-->
<!-- ===============================================-->
<main class="main" id="top">
    <nav class="navbar navbar-vertical navbar-expand-lg">
        <script>
            var navbarStyle = window.config.config.phoenixNavbarStyle;
            if (navbarStyle && navbarStyle !== 'transparent') {
              document.querySelector('body').classList.add(`navbar-${navbarStyle}`);
            }
        </script>
        <div class="collapse navbar-collapse" id="navbarVerticalCollapse">
            <!-- scrollbar removed-->
            <div class="navbar-vertical-content">
                <ul class="navbar-nav flex-column" id="navbarVerticalNav">
                    <li class="nav-item">
                  <!-- parent pages-->
                  <div class="nav-item-wrapper"><a class="nav-link label-1" style="margin-left: 8px;" href="/" role="button" data-bs-toggle="" aria-expanded="false">
                      <div class="d-flex align-items-center"><span class="nav-link-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-house-door" viewBox="0 0 16 16">
                          <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146ZM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5Z"/>
                        </svg>
                      </span><span class="nav-link-text-wrapper"><span class="nav-link-text">Dashboard</span></span>
                      </div>
                  </a>
                  </div>
                  <!-- parent pages-->
                  <div class="nav-item-wrapper"><a class="nav-link label-1" style="margin-left: 8px;" href="/" role="button" data-bs-toggle="" aria-expanded="false">
                      <div class="d-flex align-items-center"><span class="nav-link-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-rocket-takeoff" viewBox="0 0 16 16">
                          <path d="M9.752 6.193c.599.6 1.73.437 2.528-.362.798-.799.96-1.932.362-2.531-.599-.6-1.73-.438-2.528.361-.798.8-.96 1.933-.362 2.532Z"/>
                          <path d="M15.811 3.312c-.363 1.534-1.334 3.626-3.64 6.218l-.24 2.408a2.56 2.56 0 0 1-.732 1.526L8.817 15.85a.51.51 0 0 1-.867-.434l.27-1.899c.04-.28-.013-.593-.131-.956a9.42 9.42 0 0 0-.249-.657l-.082-.202c-.815-.197-1.578-.662-2.191-1.277-.614-.615-1.079-1.379-1.275-2.195l-.203-.083a9.556 9.556 0 0 0-.655-.248c-.363-.119-.675-.172-.955-.132l-1.896.27A.51.51 0 0 1 .15 7.17l2.382-2.386c.41-.41.947-.67 1.524-.734h.006l2.4-.238C9.005 1.55 11.087.582 12.623.208c.89-.217 1.59-.232 2.08-.188.244.023.435.06.57.093.067.017.12.033.16.045.184.06.279.13.351.295l.029.073a3.475 3.475 0 0 1 .157.721c.055.485.051 1.178-.159 2.065Zm-4.828 7.475.04-.04-.107 1.081a1.536 1.536 0 0 1-.44.913l-1.298 1.3.054-.38c.072-.506-.034-.993-.172-1.418a8.548 8.548 0 0 0-.164-.45c.738-.065 1.462-.38 2.087-1.006ZM5.205 5c-.625.626-.94 1.351-1.004 2.09a8.497 8.497 0 0 0-.45-.164c-.424-.138-.91-.244-1.416-.172l-.38.054 1.3-1.3c.245-.246.566-.401.91-.44l1.08-.107-.04.039Zm9.406-3.961c-.38-.034-.967-.027-1.746.163-1.558.38-3.917 1.496-6.937 4.521-.62.62-.799 1.34-.687 2.051.107.676.483 1.362 1.048 1.928.564.565 1.25.941 1.924 1.049.71.112 1.429-.067 2.048-.688 3.079-3.083 4.192-5.444 4.556-6.987.183-.771.18-1.345.138-1.713a2.835 2.835 0 0 0-.045-.283 3.078 3.078 0 0 0-.3-.041Z"/>
                          <path d="M7.009 12.139a7.632 7.632 0 0 1-1.804-1.352A7.568 7.568 0 0 1 3.794 8.86c-1.102.992-1.965 5.054-1.839 5.18.125.126 3.936-.896 5.054-1.902Z"/>
                        </svg>
                      </span><span class="nav-link-text-wrapper"><span class="nav-link-text">Getting started</span></span>
                      </div>
                  </a>
                  </div>
                  <!-- parent pages-->
                  <div class="nav-item-wrapper"><a class="nav-link dropdown-indicator label-1" style="margin-left: 8px;" href="#nv-faq" role="button" data-bs-toggle="collapse" aria-expanded="false" aria-controls="nv-faq">
                      <div class="d-flex align-items-center">
                          <div class="dropdown-indicator-icon">
                              <span class="fas fa-caret-right"></span>
                          </div>
                          <span class="nav-link-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-robot" viewBox="0 0 16 16">
                              <path d="M6 12.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5ZM3 8.062C3 6.76 4.235 5.765 5.53 5.886a26.58 26.58 0 0 0 4.94 0C11.765 5.765 13 6.76 13 8.062v1.157a.933.933 0 0 1-.765.935c-.845.147-2.34.346-4.235.346-1.895 0-3.39-.2-4.235-.346A.933.933 0 0 1 3 9.219V8.062Zm4.542-.827a.25.25 0 0 0-.217.068l-.92.9a24.767 24.767 0 0 1-1.871-.183.25.25 0 0 0-.068.495c.55.076 1.232.149 2.02.193a.25.25 0 0 0 .189-.071l.754-.736.847 1.71a.25.25 0 0 0 .404.062l.932-.97a25.286 25.286 0 0 0 1.922-.188.25.25 0 0 0-.068-.495c-.538.074-1.207.145-1.98.189a.25.25 0 0 0-.166.076l-.754.785-.842-1.7a.25.25 0 0 0-.182-.135Z"/>
                              <path d="M8.5 1.866a1 1 0 1 0-1 0V3h-2A4.5 4.5 0 0 0 1 7.5V8a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1v-.5A4.5 4.5 0 0 0 10.5 3h-2V1.866ZM14 7.5V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.5A3.5 3.5 0 0 1 5.5 4h5A3.5 3.5 0 0 1 14 7.5Z"/>
                            </svg>
                          </span>
                          <span class="nav-link-text">Trading Bots</span>
                          <span class="fa-solid fa-circle text-info ms-1 new-page-indicator" style="font-size: 6px"></span>
                      </div>
                  </a>
                      <div class="parent-wrapper label-1">
                          <ul class="nav collapse parent" data-bs-parent="#navbarVerticalCollapse" id="nv-faq">
                              <li class="collapsed-nav-item-title d-none">Trading Bots
                              </li>
                              <li class="nav-item"><a class="nav-link" href="/bots" data-bs-toggle="" aria-expanded="false">
                                  <div class="d-flex align-items-center"><span class="nav-link-text">My Bots</span>
                                  </div>
                              </a>
                                  <!-- more inner pages-->
                              </li>
                              <li class="nav-item"><a class="nav-link" href="/bots/add" data-bs-toggle="" aria-expanded="false">
                                  <div class="d-flex align-items-center"><span class="nav-link-text">The Wizard</span><span class="badge ms-2 badge badge-phoenix badge-phoenix-info ">New</span>
                                  </div>
                              </a>
                                  <!-- more inner pages-->
                              </li>
                          </ul>
                      </div>
                  </div>
                  <!-- parent pages-->
                  <div class="nav-item-wrapper"><a class="nav-link label-1" style="margin-left: 8px;" href="/market-list" role="button" data-bs-toggle="" aria-expanded="false">
                      <div class="d-flex align-items-center">
                          <span class="nav-link-icon">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-bar-chart" viewBox="0 0 16 16">
                                  <path d="M4 11H2v3h2v-3zm5-4H7v7h2V7zm5-5v12h-2V2h2zm-2-1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1h-2zM6 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm-5 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3z"/>
                                </svg>
                          </span>
                          <span class="nav-link-text-wrapper"><span class="nav-link-text">Browse Markets</span></span>
                          <span class="badge ms-2 badge badge-phoenix badge-phoenix-info nav-link-badge">New</span>
                      </div>
                  </a>
                  </div>
                  <!-- parent pages-->
                  <div class="nav-item-wrapper"><a class="nav-link label-1" style="margin-left: 8px;" href="../../widgets.html" role="button" data-bs-toggle="" aria-expanded="false">
                      <div class="d-flex align-items-center">
                          <span class="nav-link-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trophy" viewBox="0 0 16 16">
                              <path d="M2.5.5A.5.5 0 0 1 3 0h10a.5.5 0 0 1 .5.5c0 .538-.012 1.05-.034 1.536a3 3 0 1 1-1.133 5.89c-.79 1.865-1.878 2.777-2.833 3.011v2.173l1.425.356c.194.048.377.135.537.255L13.3 15.1a.5.5 0 0 1-.3.9H3a.5.5 0 0 1-.3-.9l1.838-1.379c.16-.12.343-.207.537-.255L6.5 13.11v-2.173c-.955-.234-2.043-1.146-2.833-3.012a3 3 0 1 1-1.132-5.89A33.076 33.076 0 0 1 2.5.5zm.099 2.54a2 2 0 0 0 .72 3.935c-.333-1.05-.588-2.346-.72-3.935zm10.083 3.935a2 2 0 0 0 .72-3.935c-.133 1.59-.388 2.885-.72 3.935zM3.504 1c.007.517.026 1.006.056 1.469.13 2.028.457 3.546.87 4.667C5.294 9.48 6.484 10 7 10a.5.5 0 0 1 .5.5v2.61a1 1 0 0 1-.757.97l-1.426.356a.5.5 0 0 0-.179.085L4.5 15h7l-.638-.479a.501.501 0 0 0-.18-.085l-1.425-.356a1 1 0 0 1-.757-.97V10.5A.5.5 0 0 1 9 10c.516 0 1.706-.52 2.57-2.864.413-1.12.74-2.64.87-4.667.03-.463.049-.952.056-1.469H3.504z"/>
                            </svg>
                          </span>
                          <span class="nav-link-text-wrapper"><span class="nav-link-text">Quests</span>
                          </span>
                      </div>
                  </a>
                  </div>
                  <!-- parent pages-->
                  <div class="nav-item-wrapper"><a class="nav-link label-1" style="margin-left: 8px;" href="/settings" role="button" data-bs-toggle="" aria-expanded="false">
                      <div class="d-flex align-items-center"><span class="nav-link-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-gear" viewBox="0 0 16 16">
                          <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
                          <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
                        </svg>
                      </span><span class="nav-link-text-wrapper"><span class="nav-link-text">Settings</span></span>
                      </div>
                  </a>
                  </div>
                  <!-- parent pages-->
                  <div class="nav-item-wrapper"><a class="nav-link label-1" style="margin-left: 8px;" href="https://arcana.markets" a target="_blank" rel="noopener noreferrer" role="button" data-bs-toggle="" aria-expanded="false">
                      <div class="d-flex align-items-center"><span class="nav-link-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-journal-code" viewBox="0 0 16 16">
                          <path fill-rule="evenodd" d="M8.646 5.646a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L10.293 8 8.646 6.354a.5.5 0 0 1 0-.708zm-1.292 0a.5.5 0 0 0-.708 0l-2 2a.5.5 0 0 0 0 .708l2 2a.5.5 0 0 0 .708-.708L5.707 8l1.647-1.646a.5.5 0 0 0 0-.708z"/>
                          <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z"/>
                          <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z"/>
                        </svg>
                      </span><span class="nav-link-text-wrapper"><span class="nav-link-text">Documentation</span></span>
                      </div>
                  </a>
                  </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="navbar-vertical-footer">
            <button class="btn navbar-vertical-toggle border-0 fw-semi-bold w-100 white-space-nowrap d-flex align-items-center"><span class="uil uil-left-arrow-to-left fs-0"></span><span class="uil uil-arrow-from-right fs-0"></span><span class="navbar-vertical-footer-text ms-2">Collapsed View</span></button>
        </div>
    </nav>
    <nav class="navbar navbar-top fixed-top navbar-expand" id="navbarDefault">
        <div class="collapse navbar-collapse justify-content-between">
            <div class="navbar-logo">

                <button class="btn navbar-toggler navbar-toggler-humburger-icon hover-bg-transparent" type="button" data-bs-toggle="collapse" data-bs-target="#navbarVerticalCollapse" aria-controls="navbarVerticalCollapse" aria-expanded="false" aria-label="Toggle Navigation"><span class="navbar-toggle-icon"><span class="toggle-line"></span></span></button>
                <a class="navbar-brand ms-0 me-1 me-sm-3" href="/index">
                    <div class="d-flex align-items-center">
                        <div class="d-flex align-items-center"><img src="/static/img/icons/arcana-icon-outline.png" alt="arcana" style="margin-left: -14px;" width="50" />
                            <p class="logo-text ms-2 d-none d-sm-block">arcana</p>
                        </div>
                    </div>
                </a>
            </div>
            <ul class="navbar-nav navbar-nav-icons flex-row">
                <li class="nav-item">
                    <div class="theme-control-toggle fa-icon-wait px-2">
                        <input class="form-check-input ms-0 theme-control-toggle-input" type="checkbox" data-theme-control="phoenixTheme" value="dark" id="themeControlToggle" />
                        <label class="mb-0 theme-control-toggle-label theme-control-toggle-light" for="themeControlToggle" data-bs-toggle="tooltip" data-bs-placement="left" title="Switch theme"><span class="icon" data-feather="moon"></span></label>
                        <label class="mb-0 theme-control-toggle-label theme-control-toggle-dark" for="themeControlToggle" data-bs-toggle="tooltip" data-bs-placement="left" title="Switch theme"><span class="icon" data-feather="sun"></span></label>
                    </div>
                </li>
                <li class="nav-item dropdown"><a class="nav-link lh-1 pe-0" id="navbarDropdownUser" href="#!" role="button" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-haspopup="true" aria-expanded="false">
                    <div class="avatar avatar-l ">
                        <img class="rounded-circle " src="/static/img/team/40x40/57.webp" alt="" />

                    </div>
                </a>
                    <div class="dropdown-menu dropdown-menu-end navbar-dropdown-caret py-0 dropdown-profile shadow border border-300" aria-labelledby="navbarDropdownUser">
                        <div class="card position-relative border-0">
                            <div class="card-body p-0">
                                <div class="text-center pt-4 pb-3">
                                    <div class="avatar avatar-xl ">
                                        <img class="rounded-circle " src="/static/img/team/72x72/57.webp" alt="" />

                                    </div>
                                    <h6 class="mt-2 text-black">kizz</h6>
                                    <hr/>
                                </div>
                            </div>
                            <div class="overflow-auto scrollbar" style="height: 10rem;">
                                <ul class="nav d-flex flex-column mb-2 pb-1">
                                    <li class="nav-item"><a class="nav-link px-3" href="#!"> <span class="me-2 text-900" data-feather="user"></span><span>Profile</span></a></li>
                                    <li class="nav-item"><a class="nav-link px-3" href="#!"><span class="me-2 text-900" data-feather="pie-chart"></span>Dashboard</a></li>
                                    <li class="nav-item"><a class="nav-link px-3" href="#!"> <span class="me-2 text-900" data-feather="settings"></span>Settings</a></li>
                                </ul>
                            </div>
                            <div class="card-footer pt-2 p-0 border-top">
                                <div class="px-3"> <a class="btn btn-phoenix-secondary d-flex flex-center w-100" href="#!"> <span class="me-2" data-feather="log-out"> </span>Sign out</a></div>
                                <div class="my-2 text-center fw-bold fs--2 text-600"><a class="text-600 me-1" href="#!">Privacy policy</a>&bull;<a class="text-600 mx-1" href="#!">Terms</a>&bull;<a class="text-600 ms-1" href="#!">Cookies</a></div>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </nav>
    <div class="content">
        <h2 class="mb-2 lh-sm">${myBot}</h2>
        <p class="text-700 lead mb-4">View market statistics and data relevant to your trading bot</p>
        <div class="row mb-4">
            <!-- First Div -->
            <div class="col">
            <div class="card p-4 rounded d-flex flex-column pr-md-3">
                <div class="row mb-1">
                    <div class="col font-weight-bold">
                        🤖 Bot #<span th:text="${botId + 1}"></span> / <span th:text="${botUuid}"></span>
                    </div>
                </div>
                <hr class="my-2">
                <div class="row mb-1 small">
                    <div class="col-6">
                        <strong>Market ID:</strong> <span th:text="${botMarketId}"></span>
                    </div>
                    <div class="col-6">
                        <strong>Strategy:</strong> <span th:text="${strategyName}"></span>
                    </div>
                </div>
                <hr class="my-2">
                <div class="row mb-1 small">
                    <div class="col-6">
                        <strong>Bps Spread:</strong> <span th:text="${botBpsSpread}"></span>
                    </div>
                    <div class="col-6">
                        <strong>Quote Sizes:</strong> Bid <span th:text="${botAmountBid}"></span>, Ask <span th:text="${botAmountAsk}"></span>
                    </div>
                </div>
                <hr class="my-2">
                <div class="row mb-1 small">
                    <div class="col-6">
                        <strong>OOA:</strong> <span th:text="${botOoa}"></span>
                    </div>
                    <div class="col-6">
                        <strong>Quote Wallet:</strong> <span th:text="${botQuoteWallet}"></span>
                    </div>
                </div>
                <hr class="my-2">
                <div class="row mb-1 small">
                    <div class="col-6">
                        <strong>Last Bid order:</strong> <span th:text="${lastBidOrder}"></span>
                    </div>
                    <div class="col-6">
                        <strong>Last Ask order:</strong> <span th:text="${lastAskOrder}"></span>
                    </div>
                </div>
                <hr class="my-2">
                <div class="row align-items-center">
                    <div class="col-10">
                        <strong>Public Key:</strong> <span th:text="${botBaseWallet}"></span>
                    </div>
                    <div class="col-2 d-flex align-items-center justify-content-end">
                        <a th:href="${#strings.concat('/bots/stop/', botId)}" class="btn btn-sm px-2" style="margin-right: 10px;">
                            <i data-feather="stop-circle" width="28" height="28"></i>
                        </a>
                        <a th:href="${#strings.concat('/bots/start/', botId)}" class="btn btn-sm ml-2 px-2">
                            <i data-feather="play-circle" width="28" height="28"></i>
                        </a>
                    </div>
                </div>
            </div>
            </div>

            <!-- Second Div -->
            <div class="col card bg-soft p-5 rounded">
                <div style="font-size: 1.25rem; font-weight: 500; display: inline" id="orderBookHeader">Order Book:</div>
                <hr>
                <div id="container"></div>
                <div class="row">
                    <div class="column orderBook">
                        <table id="bidsTable" class="table table-striped table-hover cell-border" style="width: 100%; table-layout: fixed;">
                            <thead>
                            <tr>
                                <th scope="col">Owner</th>
                                <th scope="col">Size</th>
                                <th scope="col" style="color: #118005">Price</th>
                            </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                    <div class="column orderBook">
                        <table id="asksTable" class="table table-striped table-hover cell-border" style="width: 100%; table-layout: fixed;">
                            <thead>
                            <tr>
                                <th scope="col" style="color: #990603">Price</th>
                                <th scope="col">Size</th>
                                <th scope="col">Owner</th>
                            </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <script th:inline="javascript">
            var activeMarketId, lastLoadedMarketId, lastLoadedChartId;
            var marketCurrencySymbol = '$';
            var totalBids, totalAsks;
            var bidTotal, askTotal;
            const ctx = document.getElementById('myChart').getContext('2d');
            const myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: [],
                    datasets: [{
                        label: 'Price',
                        data: [],
                        fill: false,
                        borderColor: 'rgb(41,98,255)',
                        tension: 0.1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: false
                        }
                    },
                    animation: false,
                    responsive: true,
                    maintainAspectRatio: false
                }
            });

            $('#searchForMarkets').click(function () {
                var baseMint = $('#tokenSelect').val();
                loadMarkets(baseMint);
            });

            // DRAW DEPTH CHART AND SET INTERVAL

            var formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
            });

            var depthChart = Highcharts.chart('container', {
                chart: {
                    type: 'area',
                    zoomType: 'xy',
                    backgroundColor: '#222222'
                },
                title: {
                    text: ''
                },
                xAxis: {
                    minPadding: 0,
                    maxPadding: 0,
                    min: 0,
                    max: 0,
                    plotLines: [{
                        color: '#888',
                        value: 0,
                        width: 1,
                        label: {
                            text: '',
                            rotation: 90
                        }
                    }]
                },
                yAxis: [{
                    lineWidth: 1,
                    gridLineWidth: 0,
                    title: null,
                    tickWidth: 1,
                    tickLength: 5,
                    tickPosition: 'inside',
                    labels: {
                        align: 'left',
                        x: 8
                    }
                }, {
                    color: '#ffffff',
                    opposite: true,
                    linkedTo: 0,
                    lineWidth: 1,
                    gridLineWidth: 0,
                    title: null,
                    tickWidth: 1,
                    tickLength: 5,
                    tickPosition: 'inside',
                    labels: {
                        align: 'right',
                        x: -8
                    }
                }],
                legend: {
                    enabled: false
                },
                plotOptions: {
                    area: {
                        fillOpacity: 0.2,
                        lineWidth: 1,
                        step: 'center'
                    }
                },
                tooltip: {
                    headerFormat: '<span style="font-size=10px;">Price: {point.key}</span><br/>',
                    valueDecimals: 2
                },
                series: [{
                    name: 'Total Quantity',
                    data: [],
                    color: '#03a7a8'
                }, {
                    name: 'Total Quantity',
                    data: [],
                    color: '#fc5857'
                }]
            });

            setInterval(updateDepthChart, 550);

        </script>
        <script type="text/javascript" th:inline="none" class="init">
            /*<![CDATA[*/
            $(document).ready(function () {
                    var bidTable = $('#bidsTable').DataTable({
                        paging: false,
                        info: false,
                        ajax: {
                            url: '/api/serum/market/' + activeMarketId + '/bids',
                            cache: true,
                            dataSrc: ''
                        },
                        columns: [
                            {
                                data: 'owner',
                                render: function (data, type, row) {
                                    if (typeof row.metadata.name !== 'undefined') {
                                        if (row.metadata.name === 'Mango') {
                                            var externalUrl = location.href.replace("#", "") + 'mango/lookup/' +
                                                row.metadata.mangoKey;
                                            return "<a target=_blank href=\"" + externalUrl + "\"><img src=\"static/entities/" +
                                                row.metadata.icon + ".png\" width=16 height=16 style=\"margin-right: 6px;\">" +
                                                row.metadata.name + " (" + row.metadata.mangoKey.substring(0, 3) + ")</a>";
                                        }

                                        return "<a target=_blank href=\"https://solana.fm/account/" + row.owner.publicKey + "\"><img src=\"static/entities/" +
                                            row.metadata.icon + ".png\" width=16 height=16 style=\"margin-right: 6px;\">" +
                                            row.metadata.name + "</a>";
                                    } else {
                                        return "<a class='coloredlink' href=\"https://solana.fm/account/" + row.owner.publicKey
                                            + "\" target=_blank>" +
                                            row.owner.publicKey.substring(0, 3) +
                                            ".." +
                                            row.owner.publicKey.substring(row.owner.publicKey.toString().length - 3) +
                                            "</a>";
                                    }
                                }
                            },
                            {data: 'quantity'},
                            {
                                data: 'price',
                                render: function (data, type, row) {
                                    return marketCurrencySymbol + data;
                                }
                            }
                        ],
                        order: [[2, 'desc']],
                        columnDefs: [
                            {
                                targets: [0],
                                className: 'dt-right',
                                width: '50%'
                            },
                            {
                                targets: [1],
                                className: 'dt-right',
                                width: '25%'
                            },
                            {
                                targets: [2],
                                className: 'dt-right',
                                width: '25%'
                            }
                        ],
                        rowCallback: function (row, data, displayNum, displayIndex, dataIndex) {
                            // Calculate percentage of bids for this row
                            // Global has this calculated called `totalBids`
                            var total = totalBids ?? 0;
                            if (total !== 0) {
                                // 0.5 percentage of lead, since top of book can look empty
                                var percentage = ((data.metadata.percent ?? 0) * 100) + 0.5;
                                var rowSelector = $(row);
                                rowSelector.css("background", "linear-gradient(270deg, #118005 " + percentage.toFixed(0) +
                                    "%, rgba(0, 0, 0, 0.00) 0%)"
                                );
                            }
                        }
                    });

                    var askTable = $('#asksTable').DataTable({
                        paging: false,
                        info: false,
                        ajax: {
                            url: '/api/serum/market/' + activeMarketId + '/asks',
                            cache: true,
                            dataSrc: ''
                        },
                        columns: [
                            {
                                data: 'price',
                                render: function (data, type, row) {
                                    return marketCurrencySymbol + data;
                                }
                            },
                            {data: 'quantity'},
                            {
                                data: 'owner',
                                render: function (data, type, row) {
                                    if (typeof row.metadata.name !== 'undefined') {
                                        if (row.metadata.name === 'Mango') {
                                            var externalUrl = location.href.replace("#", "") + 'mango/lookup/' + row.metadata.mangoKey;
                                            return "<a target=_blank href=\"" + externalUrl + "\"><img src=\"static/entities/" +
                                                row.metadata.icon + ".png\" width=16 height=16 style=\"margin-right: 6px;\">" +
                                                row.metadata.name + " (" + row.metadata.mangoKey.substring(0, 3) + ")</a>";
                                        }

                                        return "<a target=_blank href=\"https://solana.fm/account/" + row.owner.publicKey + "\"><img src=\"static/entities/" +
                                            row.metadata.icon + ".png\" width=16 height=16 style=\"margin-right: 6px;\">" +
                                            row.metadata.name + "</a>";
                                    } else {
                                        return "<a class='coloredlink' href=\"https://solana.fm/account/" +
                                            row.owner.publicKey + "\" target=_blank>" +
                                            row.owner.publicKey.substring(0, 3) +
                                            ".." +
                                            row.owner.publicKey.substring(row.owner.publicKey.toString().length - 3) +
                                            "</a>";
                                    }
                                }
                            }
                        ],
                        order: [[0, 'asc']],
                        columnDefs: [
                            {
                                targets: [0],
                                className: 'dt-left',
                                width: '25%'
                            },
                            {
                                targets: [1],
                                className: 'dt-left',
                                width: '25%'
                            },
                            {
                                targets: [2],
                                className: 'dt-left',
                                width: '50%'
                            }
                        ],
                        rowCallback: function (row, data, displayNum, displayIndex, dataIndex) {
                            // Calculate percentage of bids for this row
                            // Global has this calculated called `totalBids`
                            var total = totalAsks ?? 0;
                            if (total !== 0) {
                                // 0.5 percentage of lead, since top of book can look empty
                                var percentage = ((data.metadata.percent ?? 0) * 100) + 0.5;
                                var rowSelector = $(row);
                                rowSelector.css("background", "linear-gradient(90deg, rgb(199 6 2) " + percentage.toFixed(0) +
                                    "%, rgba(0, 0, 0, 0.00) 0%)"
                                );
                            }
                        }
                    });

                    // Trade history table
                    var tradeHistoryTable = $('#tradeHistoryTable').DataTable({
                        ordering: false,
                        searching: false,
                        paging: false,
                        info: false,
                        ajax: {
                            url: '/api/serum/market/' + activeMarketId + '/tradeHistory',
                            cache: true,
                            dataSrc: ''
                        },
                        columns: [
                            {
                                data: 'price',
                                render: function (data, type, row) {
                                    return marketCurrencySymbol + data;
                                }
                            },
                            {data: 'quantity'},
                            {
                                data: 'owner',
                                render: function (data, type, row) {
                                    if (row.takerEntityName) {
                                        var externalLink = '';
                                        if (row.takerEntityName === 'Mango') {
                                            // Add external link
                                            var externalUrl = location.href.replace("#", "") + 'mango/lookup/' + row.takerOoa.publicKey;
                                            externalLink = "<a href=\"" + externalUrl + "\" target=_blank>" +
                                                "<img src=\"static/entities/" +
                                                row.takerEntityIcon +
                                                ".png\" width=16 height=16 style=\"margin-right: 6px;\"></a>"
                                            return externalLink +
                                                "<a target=_blank href=\"" + externalUrl + "\">" +
                                                row.takerEntityName + "</a>";
                                        }

                                        return "<a target=_blank href=\"https://solana.fm/account/" + row.owner.publicKey + "\"><img src=\"static/entities/" +
                                            row.takerEntityIcon + ".png\" width=16 height=16 style=\"margin-right: 6px;\">" +
                                            row.takerEntityName + "</a>" + externalLink;
                                    } else {
                                        if (row.owner) {
                                            return "<a class='coloredlink' href=\"https://solana.fm/account/" +
                                                row.owner.publicKey + "\" target=_blank>" +
                                                row.owner.publicKey.substring(0, 3) +
                                                ".." +
                                                row.owner.publicKey.substring(row.owner.publicKey.toString().length - 3) +
                                                "</a>";
                                        } else {
                                            return "Unknown";
                                        }
                                    }
                                }
                            },
                            {
                                data: 'maker',
                                render: function (data, type, row) {
                                    if (row.makerEntityName) {
                                        var externalLink = '';
                                        if (row.makerEntityName === 'Mango') {
                                            // Add external link
                                            var externalUrl = location.href.replace("#", "") + 'mango/lookup/' + row.makerOoa.publicKey;
                                            externalLink = "<a href=\"" + externalUrl + "\" target=_blank>" +
                                                "<img src=\"static/entities/" +
                                                row.makerEntityIcon +
                                                ".png\" width=16 height=16 style=\"margin-right: 6px;\"></a>"
                                            return externalLink +
                                                "<a target=_blank href=\"" + externalUrl + "\">" +
                                                row.makerEntityName + "</a>";
                                        }

                                        return "<a target=_blank href=\"https://solana.fm/account/" +
                                            row.makerOwner.publicKey + "\"><img src=\"static/entities/" +
                                            row.makerEntityIcon + ".png\" width=16 height=16 style=\"margin-right: 6px;\">" +
                                            row.makerEntityName + "</a>";
                                    } else {
                                        if (row.makerOwner) {
                                            return "<a class='coloredlink' href=\"https://solana.fm/account/" +
                                                row.makerOwner.publicKey + "\" target=_blank>" +
                                                row.makerOwner.publicKey.substring(0, 3) +
                                                ".." +
                                                row.makerOwner.publicKey.substring(row.makerOwner.publicKey.toString().length - 3) +
                                                "</a>";
                                        } else {
                                            return "Unknown";
                                        }
                                    }
                                }
                            }
                        ],
                        columnDefs: [
                            {
                                targets: [0],
                                className: 'dt-left',
                                width: '30%'
                            },
                            {
                                targets: [1],
                                className: 'dt-left',
                                width: '20%'
                            },
                            {
                                targets: [2],
                                className: 'dt-left',
                                width: '25%'
                            },
                            {
                                targets: [3],
                                className: 'dt-left',
                                width: '25%'
                            }
                        ],
                        rowCallback: function (row, data, displayNum, displayIndex, dataIndex) {
                            var node = this.api().row(row).nodes().to$();
                            if (data.bid) {
                                node.addClass('table-success')
                            } else {
                                node.addClass('table-danger')
                            }
                        }
                    });

                    setInterval(function () {
                        bidTable.ajax.url('/api/serum/market/' + activeMarketId + '/bids');
                        bidTable.ajax.reload();
                    }, 400);
                    setInterval(function () {
                        askTable.ajax.url('/api/serum/market/' + activeMarketId + '/asks');
                        askTable.ajax.reload();
                    }, 400);
                    setInterval(function () {
                        tradeHistoryTable.ajax.url('/api/serum/market/' + activeMarketId + '/tradeHistory');
                        tradeHistoryTable.ajax.reload();
                    }, 2500);
                }
            );
            /*]]>*/
        </script>

    <footer class="footer position-fixed bg-white z-index-2">
        <div class="row g-0 justify-content-between align-items-center h-100">
            <div class="col-12 col-sm-auto text-center" >
                <p class="mb-0 mt-2 mt-sm-0 text-400 " style="font-size: 14px">&copy; Arcana Markets<span class="d-none d-sm-inline-block"></span><span class="d-none d-sm-inline-block mx-1">|</span><br class="d-sm-none" />2023 </p>
            </div>
            <div class="col-12 col-sm-auto text-center">

                <div class="nav-item-wrapper"><a class="nav-link" href="https://x.com/arcanamarkets" target="_blank" rel="noopener noreferrer" role="button" data-bs-toggle="" aria-expanded="false">
                    <div class="d-flex align-items-center">
                        <span class="d-none d-sm-inline-block invisible mx-1">|</span>
                        <div class="nav-item-wrapper"><a class="nav-link" href="https://x.com/arcanamarkets" target="_blank" rel="noopener noreferrer" role="button" data-bs-toggle="" aria-expanded="false">
                            <div class="d-flex align-items-center">
                                <span class="nav-link-icon d-none d-sm-inline-block">
                                <img src="/static/img/bootstrap-icons/twitter-x.svg" alt="Twitter/X" >
                            </span>
                            </div>
                        </a>
                        </div>
                        <span class="d-none d-sm-inline-block invisible mx-1">|</span>
                        <div class="nav-item-wrapper"><a class="nav-link" href="https://discord.gg/VUFVCEAm" target="_blank" rel="noopener noreferrer" role="button" data-bs-toggle="" aria-expanded="false">
                            <div class="d-flex align-items-center">
                                <span class="nav-link-icon d-none d-sm-inline-block">
                                <img src="/static/img/bootstrap-icons/discord.svg" alt="Discord">
                            </span>
                            </div>
                        </a>
                        </div>
                        <span class="d-none d-sm-inline-block invisible mx-1">|</span>
                        <div class="nav-item-wrapper"><a class="nav-link" href="https://github.com/makolabs-xyz/arcana" target="_blank" rel="noopener noreferrer" role="button" data-bs-toggle="" aria-expanded="false">
                            <div class="d-flex align-items-center">
                                <span class="nav-link-icon d-none d-sm-inline-block">
                                <img src="/static/img/bootstrap-icons/telegram.svg" alt="Telegram" >
                            </span>
                            </div>
                        </a>
                        </div>
                        <span class="d-none d-sm-inline-block invisible mx-1">|</span>
                        <div class="nav-item-wrapper"><a class="nav-link" href="https://github.com/makolabs-xyz/arcana" target="_blank" rel="noopener noreferrer" role="button" data-bs-toggle="" aria-expanded="false">
                            <div class="d-flex align-items-center">
                                <span class="nav-link-icon d-none d-sm-inline-block">
                                <img src="/static/img/bootstrap-icons/github.svg" alt="GitHub" >
                            </span>
                            </div>
                        </a>
                        </div>
                        <span class="d-none d-sm-inline-block invisible mx-1">|</span>
                        <div class="nav-item-wrapper"><a class="nav-link" href="https://discord.gg/VUFVCEAm" target="_blank" rel="noopener noreferrer" role="button" data-bs-toggle="" aria-expanded="false">
                            <div class="d-flex align-items-center">
                                <span class="nav-link-icon d-none d-sm-inline-block">
                                <img src="/static/img/bootstrap-icons/envelope.svg" alt="Email" >
                            </span>
                            </div>
                        </a>
                        </div>
                    </div>
                </a>
                </div>
            </div>
        </div>
    </footer>
    </div>
    <script>
        var navbarTopStyle = window.config.config.phoenixNavbarTopStyle;
        var navbarTop = document.querySelector('.navbar-top');
        if (navbarTopStyle === 'darker') {
          navbarTop.classList.add('navbar-darker');
        }

        var navbarVerticalStyle = window.config.config.phoenixNavbarVerticalStyle;
        var navbarVertical = document.querySelector('.navbar-vertical');
        if (navbarVertical && navbarVerticalStyle === 'darker') {
          navbarVertical.classList.add('navbar-darker');
        }
    </script>
</main>
    <!-- ===============================================-->
    <!--    End of Main Content-->
    <!-- ===============================================-->

    <!-- ===============================================-->
    <!--    JavaScripts-->
    <!-- ===============================================-->
    <script src="/static/vendors/popper/popper.min.js"></script>
    <script src="/static/vendors/bootstrap/bootstrap.min.js"></script>
    <script src="/static/vendors/anchorjs/anchor.min.js"></script>
    <script src="/static/vendors/is/is.min.js"></script>
    <script src="/static/vendors/fontawesome/all.min.js"></script>
    <script src="/static/vendors/lodash/lodash.min.js"></script>
    <script src="https://polyfill.io/v3/polyfill.min.js?features=window.scroll"></script>
    <script src="/static/vendors/list.js/list.min.js"></script>
    <script src="/static/vendors/feather-icons/feather.min.js"></script>
    <script src="/static/vendors/dayjs/dayjs.min.js"></script>
    <script src="/static/js/phoenix.js"></script>

    <!-- jquery & chartjs -->
    <script src="/static/js/jquery-3.6.0.min.js"></script>
    <script src="/static/js/chart.min.js"></script>

    <!-- depth -->
    <script src="/static/js/highcharts.js"></script>
    <script src="/static/js/plugin.js"></script>

    <!-- JavaScript Bundle with Popper -->
    <script src="/static/js/bootstrap.bundle.min.js"></script>
    <script src="/static/js/jquery.dataTables.min.js"></script>
    <script src="/static/js/custom.js"></script>

</body>

</html>
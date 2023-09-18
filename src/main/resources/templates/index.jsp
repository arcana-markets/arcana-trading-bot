<!DOCTYPE html>
<html lang="en-US" dir="ltr">

  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">


    <!-- ===============================================-->
    <!--    Document Title-->
    <!-- ===============================================-->
    <title>Arcana</title>


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
    <script src="/static/config.js"></script>


    <!-- ===============================================-->
    <!--    Stylesheets-->
    <!-- ===============================================-->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="">
    <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;400;600;700;800;900&amp;display=swap" rel="stylesheet">
    <link href="/static/vendors/simplebar/simplebar.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.8/css/line.css">
    <link href="/static/theme.min.css" type="text/css" rel="stylesheet" id="style-default">
    <link href="/static/vendors/leaflet/leaflet.css" rel="stylesheet">
    <link href="/static/vendors/leaflet.markercluster/MarkerCluster.css" rel="stylesheet">
    <link href="/static/vendors/leaflet.markercluster/MarkerCluster.Default.css" rel="stylesheet">
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
                <!-- label-->
                <p class="navbar-vertical-label">Pages
                </p>
                <!-- parent pages-->
                <div class="nav-item-wrapper"><a class="nav-link label-1" href="/500" role="button" data-bs-toggle="" aria-expanded="false">
                    <div class="d-flex align-items-center"><span class="nav-link-icon"><span data-feather="compass"></span></span><span class="nav-link-text-wrapper"><span class="nav-link-text">Starter</span></span>
                    </div>
                  </a>
                </div>
                <!-- parent pages-->
                <div class="nav-item-wrapper"><a class="nav-link dropdown-indicator label-1" href="#nv-faq" role="button" data-bs-toggle="collapse" aria-expanded="false" aria-controls="nv-faq">
                    <div class="d-flex align-items-center">
                      <div class="dropdown-indicator-icon"><span class="fas fa-caret-right"></span></div><span class="nav-link-icon"><span data-feather="help-circle"></span></span><span class="nav-link-text">Faq</span><span class="fa-solid fa-circle text-info ms-1 new-page-indicator" style="font-size: 6px"></span>
                    </div>
                  </a>
                  <div class="parent-wrapper label-1">
                    <ul class="nav collapse parent" data-bs-parent="#navbarVerticalCollapse" id="nv-faq">
                      <li class="collapsed-nav-item-title d-none">Faq
                      </li>
                      <li class="nav-item"><a class="nav-link" href="pages/faq/faq-accordion.html" data-bs-toggle="" aria-expanded="false">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Faq accordion</span>
                          </div>
                        </a>
                        <!-- more inner pages-->
                      </li>
                      <li class="nav-item"><a class="nav-link" href="pages/faq/faq-tab.html" data-bs-toggle="" aria-expanded="false">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Faq tab</span><span class="badge ms-2 badge badge-phoenix badge-phoenix-info ">New</span>
                          </div>
                        </a>
                        <!-- more inner pages-->
                      </li>
                    </ul>
                  </div>
                </div>
                <!-- parent pages-->
                <div class="nav-item-wrapper"><a class="nav-link dropdown-indicator label-1" href="#nv-landing" role="button" data-bs-toggle="collapse" aria-expanded="false" aria-controls="nv-landing">
                    <div class="d-flex align-items-center">
                      <div class="dropdown-indicator-icon"><span class="fas fa-caret-right"></span></div><span class="nav-link-icon"><span data-feather="globe"></span></span><span class="nav-link-text">Landing</span><span class="fa-solid fa-circle text-info ms-1 new-page-indicator" style="font-size: 6px"></span>
                    </div>
                  </a>
                  <div class="parent-wrapper label-1">
                    <ul class="nav collapse parent" data-bs-parent="#navbarVerticalCollapse" id="nv-landing">
                      <li class="collapsed-nav-item-title d-none">Landing
                      </li>
                      <li class="nav-item"><a class="nav-link" href="pages/landing/default.html" data-bs-toggle="" aria-expanded="false">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Default</span>
                          </div>
                        </a>
                        <!-- more inner pages-->
                      </li>
                      <li class="nav-item"><a class="nav-link" href="pages/landing/alternate.html" data-bs-toggle="" aria-expanded="false">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Alternate</span><span class="badge ms-2 badge badge-phoenix badge-phoenix-info ">New</span>
                          </div>
                        </a>
                        <!-- more inner pages-->
                      </li>
                    </ul>
                  </div>
                </div>
                <!-- parent pages-->
                <div class="nav-item-wrapper"><a class="nav-link dropdown-indicator label-1" href="#nv-pricing" role="button" data-bs-toggle="collapse" aria-expanded="false" aria-controls="nv-pricing">
                    <div class="d-flex align-items-center">
                      <div class="dropdown-indicator-icon"><span class="fas fa-caret-right"></span></div><span class="nav-link-icon"><span data-feather="tag"></span></span><span class="nav-link-text">Pricing</span>
                    </div>
                  </a>
                  <div class="parent-wrapper label-1">
                    <ul class="nav collapse parent" data-bs-parent="#navbarVerticalCollapse" id="nv-pricing">
                      <li class="collapsed-nav-item-title d-none">Pricing
                      </li>
                      <li class="nav-item"><a class="nav-link" href="pages/pricing/pricing-column.html" data-bs-toggle="" aria-expanded="false">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Pricing column</span>
                          </div>
                        </a>
                        <!-- more inner pages-->
                      </li>
                      <li class="nav-item"><a class="nav-link" href="pages/pricing/pricing-grid.html" data-bs-toggle="" aria-expanded="false">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Pricing grid</span>
                          </div>
                        </a>
                        <!-- more inner pages-->
                      </li>
                    </ul>
                  </div>
                </div>
                <!-- parent pages-->
                <div class="nav-item-wrapper"><a class="nav-link" href="/wizard" role="button" data-bs-toggle="" aria-expanded="false">
                    <div class="d-flex align-items-center"><span class="nav-link-icon"><span data-feather="users"></span></span><span class="nav-link-text-wrapper"><span class="nav-link-text">Members</span></span>
                    </div>
                  </a>
                </div>
                <!-- parent pages-->
                <div class="nav-item-wrapper"><a class="nav-link label-1" href="pages/timeline.html" role="button" data-bs-toggle="" aria-expanded="false">
                    <div class="d-flex align-items-center"><span class="nav-link-icon"><span data-feather="clock"></span></span><span class="nav-link-text-wrapper"><span class="nav-link-text">Timeline</span></span>
                    </div>
                  </a>
                </div>
                <!-- parent pages-->
                <div class="nav-item-wrapper"><a class="nav-link dropdown-indicator label-1" href="#nv-errors" role="button" data-bs-toggle="collapse" aria-expanded="false" aria-controls="nv-errors">
                    <div class="d-flex align-items-center">
                      <div class="dropdown-indicator-icon"><span class="fas fa-caret-right"></span></div><span class="nav-link-icon"><span data-feather="alert-triangle"></span></span><span class="nav-link-text">Errors</span><span class="fa-solid fa-circle text-info ms-1 new-page-indicator" style="font-size: 6px"></span>
                    </div>
                  </a>
                  <div class="parent-wrapper label-1">
                    <ul class="nav collapse parent" data-bs-parent="#navbarVerticalCollapse" id="nv-errors">
                      <li class="collapsed-nav-item-title d-none">Errors
                      </li>
                      <li class="nav-item"><a class="nav-link" href="pages/errors/404.html" data-bs-toggle="" aria-expanded="false">
                          <div class="d-flex align-items-center"><span class="nav-link-text">404</span>
                          </div>
                        </a>
                        <!-- more inner pages-->
                      </li>
                      <li class="nav-item"><a class="nav-link" href="pages/errors/403.html" data-bs-toggle="" aria-expanded="false">
                          <div class="d-flex align-items-center"><span class="nav-link-text">403</span><span class="badge ms-2 badge badge-phoenix badge-phoenix-info ">New</span>
                          </div>
                        </a>
                        <!-- more inner pages-->
                      </li>
                      <li class="nav-item"><a class="nav-link" href="pages/errors/500.html" data-bs-toggle="" aria-expanded="false">
                          <div class="d-flex align-items-center"><span class="nav-link-text">500</span>
                          </div>
                        </a>
                        <!-- more inner pages-->
                      </li>
                    </ul>
                  </div>
                </div>
                <!-- parent pages-->
                <div class="nav-item-wrapper"><a class="nav-link dropdown-indicator label-1" href="#nv-authentication" role="button" data-bs-toggle="collapse" aria-expanded="false" aria-controls="nv-authentication">
                    <div class="d-flex align-items-center">
                      <div class="dropdown-indicator-icon"><span class="fas fa-caret-right"></span></div><span class="nav-link-icon"><span data-feather="lock"></span></span><span class="nav-link-text">Authentication</span><span class="fa-solid fa-circle text-info ms-1 new-page-indicator" style="font-size: 6px"></span>
                    </div>
                  </a>
                  <div class="parent-wrapper label-1">
                    <ul class="nav collapse parent" data-bs-parent="#navbarVerticalCollapse" id="nv-authentication">
                      <li class="collapsed-nav-item-title d-none">Authentication
                      </li>
                      <li class="nav-item"><a class="nav-link dropdown-indicator" href="#nv-simple" data-bs-toggle="collapse" aria-expanded="false" aria-controls="nv-simple">
                          <div class="d-flex align-items-center">
                            <div class="dropdown-indicator-icon"><span class="fas fa-caret-right"></span></div><span class="nav-link-text">Simple</span><span class="fa-solid fa-circle text-info ms-1 new-page-indicator" style="font-size: 6px"></span>
                          </div>
                        </a>
                        <!-- more inner pages-->
                        <div class="parent-wrapper">
                          <ul class="nav collapse parent" data-bs-parent="#authentication" id="nv-simple">
                            <li class="nav-item"><a class="nav-link" href="pages/authentication/simple/sign-in.html" data-bs-toggle="" aria-expanded="false">
                                <div class="d-flex align-items-center"><span class="nav-link-text">Sign in</span>
                                </div>
                              </a>
                              <!-- more inner pages-->
                            </li>
                            <li class="nav-item"><a class="nav-link" href="pages/authentication/simple/sign-up.html" data-bs-toggle="" aria-expanded="false">
                                <div class="d-flex align-items-center"><span class="nav-link-text">Sign up</span>
                                </div>
                              </a>
                              <!-- more inner pages-->
                            </li>
                            <li class="nav-item"><a class="nav-link" href="pages/authentication/simple/sign-out.html" data-bs-toggle="" aria-expanded="false">
                                <div class="d-flex align-items-center"><span class="nav-link-text">Sign out</span>
                                </div>
                              </a>
                              <!-- more inner pages-->
                            </li>
                            <li class="nav-item"><a class="nav-link" href="pages/authentication/simple/forgot-password.html" data-bs-toggle="" aria-expanded="false">
                                <div class="d-flex align-items-center"><span class="nav-link-text">Forgot password</span>
                                </div>
                              </a>
                              <!-- more inner pages-->
                            </li>
                            <li class="nav-item"><a class="nav-link" href="pages/authentication/simple/reset-password.html" data-bs-toggle="" aria-expanded="false">
                                <div class="d-flex align-items-center"><span class="nav-link-text">Reset password</span>
                                </div>
                              </a>
                              <!-- more inner pages-->
                            </li>
                            <li class="nav-item"><a class="nav-link" href="pages/authentication/simple/lock-screen.html" data-bs-toggle="" aria-expanded="false">
                                <div class="d-flex align-items-center"><span class="nav-link-text">Lock screen</span>
                                </div>
                              </a>
                              <!-- more inner pages-->
                            </li>
                            <li class="nav-item"><a class="nav-link" href="pages/authentication/simple/2FA.html" data-bs-toggle="" aria-expanded="false">
                                <div class="d-flex align-items-center"><span class="nav-link-text">2FA</span><span class="badge ms-2 badge badge-phoenix badge-phoenix-info ">New</span>
                                </div>
                              </a>
                              <!-- more inner pages-->
                            </li>
                          </ul>
                        </div>
                      </li>
                      <li class="nav-item"><a class="nav-link dropdown-indicator" href="#nv-split" data-bs-toggle="collapse" aria-expanded="false" aria-controls="nv-split">
                          <div class="d-flex align-items-center">
                            <div class="dropdown-indicator-icon"><span class="fas fa-caret-right"></span></div><span class="nav-link-text">Split</span><span class="fa-solid fa-circle text-info ms-1 new-page-indicator" style="font-size: 6px"></span>
                          </div>
                        </a>
                        <!-- more inner pages-->
                        <div class="parent-wrapper">
                          <ul class="nav collapse parent" data-bs-parent="#authentication" id="nv-split">
                            <li class="nav-item"><a class="nav-link" href="pages/authentication/split/sign-in.html" data-bs-toggle="" aria-expanded="false">
                                <div class="d-flex align-items-center"><span class="nav-link-text">Sign in</span>
                                </div>
                              </a>
                              <!-- more inner pages-->
                            </li>
                            <li class="nav-item"><a class="nav-link" href="pages/authentication/split/sign-up.html" data-bs-toggle="" aria-expanded="false">
                                <div class="d-flex align-items-center"><span class="nav-link-text">Sign up</span>
                                </div>
                              </a>
                              <!-- more inner pages-->
                            </li>
                            <li class="nav-item"><a class="nav-link" href="pages/authentication/split/sign-out.html" data-bs-toggle="" aria-expanded="false">
                                <div class="d-flex align-items-center"><span class="nav-link-text">Sign out</span>
                                </div>
                              </a>
                              <!-- more inner pages-->
                            </li>
                            <li class="nav-item"><a class="nav-link" href="pages/authentication/split/forgot-password.html" data-bs-toggle="" aria-expanded="false">
                                <div class="d-flex align-items-center"><span class="nav-link-text">Forgot password</span>
                                </div>
                              </a>
                              <!-- more inner pages-->
                            </li>
                            <li class="nav-item"><a class="nav-link" href="pages/authentication/split/reset-password.html" data-bs-toggle="" aria-expanded="false">
                                <div class="d-flex align-items-center"><span class="nav-link-text">Reset password</span>
                                </div>
                              </a>
                              <!-- more inner pages-->
                            </li>
                            <li class="nav-item"><a class="nav-link" href="pages/authentication/split/lock-screen.html" data-bs-toggle="" aria-expanded="false">
                                <div class="d-flex align-items-center"><span class="nav-link-text">Lock screen</span>
                                </div>
                              </a>
                              <!-- more inner pages-->
                            </li>
                            <li class="nav-item"><a class="nav-link" href="pages/authentication/split/2FA.html" data-bs-toggle="" aria-expanded="false">
                                <div class="d-flex align-items-center"><span class="nav-link-text">2FA</span><span class="badge ms-2 badge badge-phoenix badge-phoenix-info ">New</span>
                                </div>
                              </a>
                              <!-- more inner pages-->
                            </li>
                          </ul>
                        </div>
                      </li>
                      <li class="nav-item"><a class="nav-link dropdown-indicator" href="#nv-Card" data-bs-toggle="collapse" aria-expanded="false" aria-controls="nv-Card">
                          <div class="d-flex align-items-center">
                            <div class="dropdown-indicator-icon"><span class="fas fa-caret-right"></span></div><span class="nav-link-text">Card</span><span class="fa-solid fa-circle text-info ms-1 new-page-indicator" style="font-size: 6px"></span>
                          </div>
                        </a>
                        <!-- more inner pages-->
                        <div class="parent-wrapper">
                          <ul class="nav collapse parent" data-bs-parent="#authentication" id="nv-Card">
                            <li class="nav-item"><a class="nav-link" href="pages/authentication/card/sign-in.html" data-bs-toggle="" aria-expanded="false">
                                <div class="d-flex align-items-center"><span class="nav-link-text">Sign in</span>
                                </div>
                              </a>
                              <!-- more inner pages-->
                            </li>
                            <li class="nav-item"><a class="nav-link" href="pages/authentication/card/sign-up.html" data-bs-toggle="" aria-expanded="false">
                                <div class="d-flex align-items-center"><span class="nav-link-text">Sign up</span>
                                </div>
                              </a>
                              <!-- more inner pages-->
                            </li>
                            <li class="nav-item"><a class="nav-link" href="pages/authentication/card/sign-out.html" data-bs-toggle="" aria-expanded="false">
                                <div class="d-flex align-items-center"><span class="nav-link-text">Sign out</span>
                                </div>
                              </a>
                              <!-- more inner pages-->
                            </li>
                            <li class="nav-item"><a class="nav-link" href="pages/authentication/card/forgot-password.html" data-bs-toggle="" aria-expanded="false">
                                <div class="d-flex align-items-center"><span class="nav-link-text">Forgot password</span>
                                </div>
                              </a>
                              <!-- more inner pages-->
                            </li>
                            <li class="nav-item"><a class="nav-link" href="pages/authentication/card/reset-password.html" data-bs-toggle="" aria-expanded="false">
                                <div class="d-flex align-items-center"><span class="nav-link-text">Reset password</span>
                                </div>
                              </a>
                              <!-- more inner pages-->
                            </li>
                            <li class="nav-item"><a class="nav-link" href="pages/authentication/card/lock-screen.html" data-bs-toggle="" aria-expanded="false">
                                <div class="d-flex align-items-center"><span class="nav-link-text">Lock screen</span>
                                </div>
                              </a>
                              <!-- more inner pages-->
                            </li>
                            <li class="nav-item"><a class="nav-link" href="pages/authentication/card/2FA.html" data-bs-toggle="" aria-expanded="false">
                                <div class="d-flex align-items-center"><span class="nav-link-text">2FA</span><span class="badge ms-2 badge badge-phoenix badge-phoenix-info ">New</span>
                                </div>
                              </a>
                              <!-- more inner pages-->
                            </li>
                          </ul>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <!-- parent pages-->
                <div class="nav-item-wrapper"><a class="nav-link dropdown-indicator label-1" href="#nv-layouts" role="button" data-bs-toggle="collapse" aria-expanded="false" aria-controls="nv-layouts">
                    <div class="d-flex align-items-center">
                      <div class="dropdown-indicator-icon"><span class="fas fa-caret-right"></span></div><span class="nav-link-icon"><span data-feather="layout"></span></span><span class="nav-link-text">Layouts</span>
                    </div>
                  </a>
                  <div class="parent-wrapper label-1">
                    <ul class="nav collapse parent" data-bs-parent="#navbarVerticalCollapse" id="nv-layouts">
                      <li class="collapsed-nav-item-title d-none">Layouts
                      </li>
                      <li class="nav-item"><a class="nav-link" href="demo/vertical-sidenav.html" data-bs-toggle="" aria-expanded="false">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Vertical sidenav</span>
                          </div>
                        </a>
                        <!-- more inner pages-->
                      </li>
                      <li class="nav-item"><a class="nav-link" href="demo/dark-mode.html" data-bs-toggle="" aria-expanded="false">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Dark mode</span>
                          </div>
                        </a>
                        <!-- more inner pages-->
                      </li>
                      <li class="nav-item"><a class="nav-link" href="demo/sidenav-collapse.html" data-bs-toggle="" aria-expanded="false">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Sidenav collapse</span>
                          </div>
                        </a>
                        <!-- more inner pages-->
                      </li>
                      <li class="nav-item"><a class="nav-link" href="demo/darknav.html" data-bs-toggle="" aria-expanded="false">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Darknav</span>
                          </div>
                        </a>
                        <!-- more inner pages-->
                      </li>
                      <li class="nav-item"><a class="nav-link" href="demo/topnav-slim.html" data-bs-toggle="" aria-expanded="false">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Topnav slim</span>
                          </div>
                        </a>
                        <!-- more inner pages-->
                      </li>
                      <li class="nav-item"><a class="nav-link" href="demo/navbar-top-slim.html" data-bs-toggle="" aria-expanded="false">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Navbar top slim</span>
                          </div>
                        </a>
                        <!-- more inner pages-->
                      </li>
                      <li class="nav-item"><a class="nav-link" href="demo/navbar-top.html" data-bs-toggle="" aria-expanded="false">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Navbar top</span>
                          </div>
                        </a>
                        <!-- more inner pages-->
                      </li>
                      <li class="nav-item"><a class="nav-link" href="demo/horizontal-slim.html" data-bs-toggle="" aria-expanded="false">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Horizontal slim</span>
                          </div>
                        </a>
                        <!-- more inner pages-->
                      </li>
                      <li class="nav-item"><a class="nav-link" href="demo/combo-nav.html" data-bs-toggle="" aria-expanded="false">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Combo nav</span>
                          </div>
                        </a>
                        <!-- more inner pages-->
                      </li>
                      <li class="nav-item"><a class="nav-link" href="demo/combo-nav-slim.html" data-bs-toggle="" aria-expanded="false">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Combo nav slim</span>
                          </div>
                        </a>
                        <!-- more inner pages-->
                      </li>
                      <li class="nav-item"><a class="nav-link" href="demo/dual-nav.html" data-bs-toggle="" aria-expanded="false">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Dual nav</span>
                          </div>
                        </a>
                        <!-- more inner pages-->
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
              <li class="nav-item">
                <!-- label-->
                <p class="navbar-vertical-label">Modules
                </p>
                <hr class="navbar-vertical-line" />
                <!-- parent pages-->
                <div class="nav-item-wrapper"><a class="nav-link dropdown-indicator label-1" href="#nv-forms" role="button" data-bs-toggle="collapse" aria-expanded="false" aria-controls="nv-forms">
                    <div class="d-flex align-items-center">
                      <div class="dropdown-indicator-icon"><span class="fas fa-caret-right"></span></div><span class="nav-link-icon"><span data-feather="file-text"></span></span><span class="nav-link-text">Forms</span>
                    </div>
                  </a>
                  <div class="parent-wrapper label-1">
                    <ul class="nav collapse parent" data-bs-parent="#navbarVerticalCollapse" id="nv-forms">
                      <li class="collapsed-nav-item-title d-none">Forms
                      </li>
                      <li class="nav-item"><a class="nav-link dropdown-indicator" href="#nv-basic" data-bs-toggle="collapse" aria-expanded="false" aria-controls="nv-basic">
                          <div class="d-flex align-items-center">
                            <div class="dropdown-indicator-icon"><span class="fas fa-caret-right"></span></div><span class="nav-link-text">Basic</span>
                          </div>
                        </a>
                        <!-- more inner pages-->
                        <div class="parent-wrapper">
                          <ul class="nav collapse parent" data-bs-parent="#forms" id="nv-basic">
                            <li class="nav-item"><a class="nav-link" href="modules/forms/basic/form-control.html" data-bs-toggle="" aria-expanded="false">
                                <div class="d-flex align-items-center"><span class="nav-link-text">Form control</span>
                                </div>
                              </a>
                              <!-- more inner pages-->
                            </li>
                            <li class="nav-item"><a class="nav-link" href="modules/forms/basic/input-group.html" data-bs-toggle="" aria-expanded="false">
                                <div class="d-flex align-items-center"><span class="nav-link-text">Input group</span>
                                </div>
                              </a>
                              <!-- more inner pages-->
                            </li>
                            <li class="nav-item"><a class="nav-link" href="modules/forms/basic/select.html" data-bs-toggle="" aria-expanded="false">
                                <div class="d-flex align-items-center"><span class="nav-link-text">Select</span>
                                </div>
                              </a>
                              <!-- more inner pages-->
                            </li>
                            <li class="nav-item"><a class="nav-link" href="modules/forms/basic/checks.html" data-bs-toggle="" aria-expanded="false">
                                <div class="d-flex align-items-center"><span class="nav-link-text">Checks</span>
                                </div>
                              </a>
                              <!-- more inner pages-->
                            </li>
                            <li class="nav-item"><a class="nav-link" href="modules/forms/basic/range.html" data-bs-toggle="" aria-expanded="false">
                                <div class="d-flex align-items-center"><span class="nav-link-text">Range</span>
                                </div>
                              </a>
                              <!-- more inner pages-->
                            </li>
                            <li class="nav-item"><a class="nav-link" href="modules/forms/basic/floating-labels.html" data-bs-toggle="" aria-expanded="false">
                                <div class="d-flex align-items-center"><span class="nav-link-text">Floating labels</span>
                                </div>
                              </a>
                              <!-- more inner pages-->
                            </li>
                            <li class="nav-item"><a class="nav-link" href="modules/forms/basic/layout.html" data-bs-toggle="" aria-expanded="false">
                                <div class="d-flex align-items-center"><span class="nav-link-text">Layout</span>
                                </div>
                              </a>
                              <!-- more inner pages-->
                            </li>
                          </ul>
                        </div>
                      </li>
                      <li class="nav-item"><a class="nav-link dropdown-indicator" href="#nv-advance" data-bs-toggle="collapse" aria-expanded="false" aria-controls="nv-advance">
                          <div class="d-flex align-items-center">
                            <div class="dropdown-indicator-icon"><span class="fas fa-caret-right"></span></div><span class="nav-link-text">Advance</span>
                          </div>
                        </a>
                        <!-- more inner pages-->
                        <div class="parent-wrapper">
                          <ul class="nav collapse parent" data-bs-parent="#forms" id="nv-advance">
                            <li class="nav-item"><a class="nav-link" href="modules/forms/advance/advance-select.html" data-bs-toggle="" aria-expanded="false">
                                <div class="d-flex align-items-center"><span class="nav-link-text">Advance select</span>
                                </div>
                              </a>
                              <!-- more inner pages-->
                            </li>
                            <li class="nav-item"><a class="nav-link" href="modules/forms/advance/date-picker.html" data-bs-toggle="" aria-expanded="false">
                                <div class="d-flex align-items-center"><span class="nav-link-text">Date picker</span>
                                </div>
                              </a>
                              <!-- more inner pages-->
                            </li>
                            <li class="nav-item"><a class="nav-link" href="modules/forms/advance/editor.html" data-bs-toggle="" aria-expanded="false">
                                <div class="d-flex align-items-center"><span class="nav-link-text">Editor</span>
                                </div>
                              </a>
                              <!-- more inner pages-->
                            </li>
                            <li class="nav-item"><a class="nav-link" href="modules/forms/advance/file-uploader.html" data-bs-toggle="" aria-expanded="false">
                                <div class="d-flex align-items-center"><span class="nav-link-text">File uploader</span>
                                </div>
                              </a>
                              <!-- more inner pages-->
                            </li>
                            <li class="nav-item"><a class="nav-link" href="modules/forms/advance/rating.html" data-bs-toggle="" aria-expanded="false">
                                <div class="d-flex align-items-center"><span class="nav-link-text">Rating</span>
                                </div>
                              </a>
                              <!-- more inner pages-->
                            </li>
                            <li class="nav-item"><a class="nav-link" href="modules/forms/advance/emoji-button.html" data-bs-toggle="" aria-expanded="false">
                                <div class="d-flex align-items-center"><span class="nav-link-text">Emoji button</span>
                                </div>
                              </a>
                              <!-- more inner pages-->
                            </li>
                          </ul>
                        </div>
                      </li>
                      <li class="nav-item"><a class="nav-link" href="modules/forms/validation.html" data-bs-toggle="" aria-expanded="false">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Validation</span>
                          </div>
                        </a>
                        <!-- more inner pages-->
                      </li>
                      <li class="nav-item"><a class="nav-link" href="modules/forms/wizard.html" data-bs-toggle="" aria-expanded="false">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Wizard</span>
                          </div>
                        </a>
                        <!-- more inner pages-->
                      </li>
                    </ul>
                  </div>
                </div>
                <!-- parent pages-->
                <div class="nav-item-wrapper"><a class="nav-link dropdown-indicator label-1" href="#nv-icons" role="button" data-bs-toggle="collapse" aria-expanded="false" aria-controls="nv-icons">
                    <div class="d-flex align-items-center">
                      <div class="dropdown-indicator-icon"><span class="fas fa-caret-right"></span></div><span class="nav-link-icon"><span data-feather="grid"></span></span><span class="nav-link-text">Icons</span>
                    </div>
                  </a>
                  <div class="parent-wrapper label-1">
                    <ul class="nav collapse parent" data-bs-parent="#navbarVerticalCollapse" id="nv-icons">
                      <li class="collapsed-nav-item-title d-none">Icons
                      </li>
                      <li class="nav-item"><a class="nav-link" href="modules/icons/feather.html" data-bs-toggle="" aria-expanded="false">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Feather</span>
                          </div>
                        </a>
                        <!-- more inner pages-->
                      </li>
                      <li class="nav-item"><a class="nav-link" href="modules/icons/font-awesome.html" data-bs-toggle="" aria-expanded="false">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Font awesome</span>
                          </div>
                        </a>
                        <!-- more inner pages-->
                      </li>
                      <li class="nav-item"><a class="nav-link" href="modules/icons/unicons.html" data-bs-toggle="" aria-expanded="false">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Unicons</span>
                          </div>
                        </a>
                        <!-- more inner pages-->
                      </li>
                    </ul>
                  </div>
                </div>
                <!-- parent pages-->
                <div class="nav-item-wrapper"><a class="nav-link dropdown-indicator label-1" href="#nv-tables" role="button" data-bs-toggle="collapse" aria-expanded="false" aria-controls="nv-tables">
                    <div class="d-flex align-items-center">
                      <div class="dropdown-indicator-icon"><span class="fas fa-caret-right"></span></div><span class="nav-link-icon"><span data-feather="columns"></span></span><span class="nav-link-text">Tables</span>
                    </div>
                  </a>
                  <div class="parent-wrapper label-1">
                    <ul class="nav collapse parent" data-bs-parent="#navbarVerticalCollapse" id="nv-tables">
                      <li class="collapsed-nav-item-title d-none">Tables
                      </li>
                      <li class="nav-item"><a class="nav-link" href="modules/tables/basic-tables.html" data-bs-toggle="" aria-expanded="false">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Basic tables</span>
                          </div>
                        </a>
                        <!-- more inner pages-->
                      </li>
                      <li class="nav-item"><a class="nav-link" href="modules/tables/advance-tables.html" data-bs-toggle="" aria-expanded="false">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Advance tables</span>
                          </div>
                        </a>
                        <!-- more inner pages-->
                      </li>
                      <li class="nav-item"><a class="nav-link" href="modules/tables/bulk-select.html" data-bs-toggle="" aria-expanded="false">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Bulk Select</span>
                          </div>
                        </a>
                        <!-- more inner pages-->
                      </li>
                    </ul>
                  </div>
                </div>
                <!-- parent pages-->
                <div class="nav-item-wrapper"><a class="nav-link dropdown-indicator label-1" href="#nv-ECharts" role="button" data-bs-toggle="collapse" aria-expanded="false" aria-controls="nv-ECharts">
                    <div class="d-flex align-items-center">
                      <div class="dropdown-indicator-icon"><span class="fas fa-caret-right"></span></div><span class="nav-link-icon"><span data-feather="bar-chart-2"></span></span><span class="nav-link-text">ECharts</span>
                    </div>
                  </a>
                  <div class="parent-wrapper label-1">
                    <ul class="nav collapse parent" data-bs-parent="#navbarVerticalCollapse" id="nv-ECharts">
                      <li class="collapsed-nav-item-title d-none">ECharts
                      </li>
                      <li class="nav-item"><a class="nav-link" href="modules/echarts/line-charts.html" data-bs-toggle="" aria-expanded="false">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Line charts</span>
                          </div>
                        </a>
                        <!-- more inner pages-->
                      </li>
                      <li class="nav-item"><a class="nav-link" href="modules/echarts/bar-charts.html" data-bs-toggle="" aria-expanded="false">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Bar charts</span>
                          </div>
                        </a>
                        <!-- more inner pages-->
                      </li>
                      <li class="nav-item"><a class="nav-link" href="modules/echarts/candlestick-charts.html" data-bs-toggle="" aria-expanded="false">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Candlestick charts</span>
                          </div>
                        </a>
                        <!-- more inner pages-->
                      </li>
                      <li class="nav-item"><a class="nav-link" href="modules/echarts/geo-map.html" data-bs-toggle="" aria-expanded="false">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Geo map</span>
                          </div>
                        </a>
                        <!-- more inner pages-->
                      </li>
                      <li class="nav-item"><a class="nav-link" href="modules/echarts/scatter-charts.html" data-bs-toggle="" aria-expanded="false">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Scatter charts</span>
                          </div>
                        </a>
                        <!-- more inner pages-->
                      </li>
                      <li class="nav-item"><a class="nav-link" href="modules/echarts/pie-charts.html" data-bs-toggle="" aria-expanded="false">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Pie charts</span>
                          </div>
                        </a>
                        <!-- more inner pages-->
                      </li>
                      <li class="nav-item"><a class="nav-link" href="modules/echarts/gauge-chart.html" data-bs-toggle="" aria-expanded="false">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Gauge chart</span>
                          </div>
                        </a>
                        <!-- more inner pages-->
                      </li>
                      <li class="nav-item"><a class="nav-link" href="modules/echarts/radar-charts.html" data-bs-toggle="" aria-expanded="false">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Radar charts</span>
                          </div>
                        </a>
                        <!-- more inner pages-->
                      </li>
                      <li class="nav-item"><a class="nav-link" href="modules/echarts/heatmap-charts.html" data-bs-toggle="" aria-expanded="false">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Heatmap charts</span>
                          </div>
                        </a>
                        <!-- more inner pages-->
                      </li>
                      <li class="nav-item"><a class="nav-link" href="modules/echarts/how-to-use.html" data-bs-toggle="" aria-expanded="false">
                          <div class="d-flex align-items-center"><span class="nav-link-text">How to use</span>
                          </div>
                        </a>
                        <!-- more inner pages-->
                      </li>
                    </ul>
                  </div>
                </div>
                <!-- parent pages-->
                <div class="nav-item-wrapper"><a class="nav-link dropdown-indicator label-1" href="#nv-components" role="button" data-bs-toggle="collapse" aria-expanded="false" aria-controls="nv-components">
                    <div class="d-flex align-items-center">
                      <div class="dropdown-indicator-icon"><span class="fas fa-caret-right"></span></div><span class="nav-link-icon"><span data-feather="package"></span></span><span class="nav-link-text">Components</span>
                    </div>
                  </a>
                  <div class="parent-wrapper label-1">
                    <ul class="nav collapse parent" data-bs-parent="#navbarVerticalCollapse" id="nv-components">
                      <li class="collapsed-nav-item-title d-none">Components
                      </li>
                      <li class="nav-item"><a class="nav-link" href="modules/components/accordion.html" data-bs-toggle="" aria-expanded="false">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Accordion</span>
                          </div>
                        </a>
                        <!-- more inner pages-->
                      </li>
                      <li class="nav-item"><a class="nav-link" href="modules/components/avatar.html" data-bs-toggle="" aria-expanded="false">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Avatar</span>
                          </div>
                        </a>
                        <!-- more inner pages-->
                      </li>
                      <li class="nav-item"><a class="nav-link" href="modules/components/alerts.html" data-bs-toggle="" aria-expanded="false">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Alerts</span>
                          </div>
                        </a>
                        <!-- more inner pages-->
                      </li>
                      <li class="nav-item"><a class="nav-link" href="modules/components/badge.html" data-bs-toggle="" aria-expanded="false">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Badge</span>
                          </div>
                        </a>
                        <!-- more inner pages-->
                      </li>
                      <li class="nav-item"><a class="nav-link" href="modules/components/breadcrumb.html" data-bs-toggle="" aria-expanded="false">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Breadcrumb</span>
                          </div>
                        </a>
                        <!-- more inner pages-->
                      </li>
                      <li class="nav-item"><a class="nav-link" href="modules/components/button.html" data-bs-toggle="" aria-expanded="false">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Buttons</span>
                          </div>
                        </a>
                        <!-- more inner pages-->
                      </li>
                      <li class="nav-item"><a class="nav-link" href="modules/components/calendar.html" data-bs-toggle="" aria-expanded="false">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Calendar</span>
                          </div>
                        </a>
                        <!-- more inner pages-->
                      </li>
                      <li class="nav-item"><a class="nav-link" href="modules/components/card.html" data-bs-toggle="" aria-expanded="false">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Card</span>
                          </div>
                        </a>
                        <!-- more inner pages-->
                      </li>
                      <li class="nav-item"><a class="nav-link dropdown-indicator" href="#nv-carousel" data-bs-toggle="collapse" aria-expanded="false" aria-controls="nv-carousel">
                          <div class="d-flex align-items-center">
                            <div class="dropdown-indicator-icon"><span class="fas fa-caret-right"></span></div><span class="nav-link-text">Carousel</span>
                          </div>
                        </a>
                        <!-- more inner pages-->
                        <div class="parent-wrapper">
                          <ul class="nav collapse parent" data-bs-parent="#components" id="nv-carousel">
                            <li class="nav-item"><a class="nav-link" href="modules/components/carousel/bootstrap.html" data-bs-toggle="" aria-expanded="false">
                                <div class="d-flex align-items-center"><span class="nav-link-text">Bootstrap</span>
                                </div>
                              </a>
                              <!-- more inner pages-->
                            </li>
                            <li class="nav-item"><a class="nav-link" href="modules/components/carousel/swiper.html" data-bs-toggle="" aria-expanded="false">
                                <div class="d-flex align-items-center"><span class="nav-link-text">Swiper</span>
                                </div>
                              </a>
                              <!-- more inner pages-->
                            </li>
                          </ul>
                        </div>
                      </li>
                      <li class="nav-item"><a class="nav-link" href="modules/components/collapse.html" data-bs-toggle="" aria-expanded="false">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Collapse</span>
                          </div>
                        </a>
                        <!-- more inner pages-->
                      </li>
                      <li class="nav-item"><a class="nav-link" href="modules/components/dropdown.html" data-bs-toggle="" aria-expanded="false">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Dropdown</span>
                          </div>
                        </a>
                        <!-- more inner pages-->
                      </li>
                      <li class="nav-item"><a class="nav-link" href="modules/components/list-group.html" data-bs-toggle="" aria-expanded="false">
                          <div class="d-flex align-items-center"><span class="nav-link-text">List group</span>
                          </div>
                        </a>
                        <!-- more inner pages-->
                      </li>
                      <li class="nav-item"><a class="nav-link" href="modules/components/modal.html" data-bs-toggle="" aria-expanded="false">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Modals</span>
                          </div>
                        </a>
                        <!-- more inner pages-->
                      </li>
                      <li class="nav-item"><a class="nav-link dropdown-indicator" href="#nv-navs-_and_-Tabs" data-bs-toggle="collapse" aria-expanded="false" aria-controls="nv-navs-_and_-Tabs">
                          <div class="d-flex align-items-center">
                            <div class="dropdown-indicator-icon"><span class="fas fa-caret-right"></span></div><span class="nav-link-text">Navs &amp; Tabs</span>
                          </div>
                        </a>
                        <!-- more inner pages-->
                        <div class="parent-wrapper">
                          <ul class="nav collapse parent" data-bs-parent="#components" id="nv-navs-_and_-Tabs">
                            <li class="nav-item"><a class="nav-link" href="modules/components/navs-and-tabs/navs.html" data-bs-toggle="" aria-expanded="false">
                                <div class="d-flex align-items-center"><span class="nav-link-text">Navs</span>
                                </div>
                              </a>
                              <!-- more inner pages-->
                            </li>
                            <li class="nav-item"><a class="nav-link" href="modules/components/navs-and-tabs/navbar.html" data-bs-toggle="" aria-expanded="false">
                                <div class="d-flex align-items-center"><span class="nav-link-text">Navbar</span>
                                </div>
                              </a>
                              <!-- more inner pages-->
                            </li>
                            <li class="nav-item"><a class="nav-link" href="modules/components/navs-and-tabs/tabs.html" data-bs-toggle="" aria-expanded="false">
                                <div class="d-flex align-items-center"><span class="nav-link-text">Tabs</span>
                                </div>
                              </a>
                              <!-- more inner pages-->
                            </li>
                          </ul>
                        </div>
                      </li>
                      <li class="nav-item"><a class="nav-link" href="modules/components/offcanvas.html" data-bs-toggle="" aria-expanded="false">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Offcanvas</span>
                          </div>
                        </a>
                        <!-- more inner pages-->
                      </li>
                      <li class="nav-item"><a class="nav-link" href="modules/components/progress-bar.html" data-bs-toggle="" aria-expanded="false">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Progress bar</span>
                          </div>
                        </a>
                        <!-- more inner pages-->
                      </li>
                      <li class="nav-item"><a class="nav-link" href="modules/components/placeholder.html" data-bs-toggle="" aria-expanded="false">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Placeholder</span>
                          </div>
                        </a>
                        <!-- more inner pages-->
                      </li>
                      <li class="nav-item"><a class="nav-link" href="modules/components/pagination.html" data-bs-toggle="" aria-expanded="false">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Pagination</span>
                          </div>
                        </a>
                        <!-- more inner pages-->
                      </li>
                      <li class="nav-item"><a class="nav-link" href="modules/components/popovers.html" data-bs-toggle="" aria-expanded="false">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Popovers</span>
                          </div>
                        </a>
                        <!-- more inner pages-->
                      </li>
                      <li class="nav-item"><a class="nav-link" href="modules/components/scrollspy.html" data-bs-toggle="" aria-expanded="false">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Scrollspy</span>
                          </div>
                        </a>
                        <!-- more inner pages-->
                      </li>
                      <li class="nav-item"><a class="nav-link" href="modules/components/sortable.html" data-bs-toggle="" aria-expanded="false">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Sortable</span>
                          </div>
                        </a>
                        <!-- more inner pages-->
                      </li>
                      <li class="nav-item"><a class="nav-link" href="modules/components/spinners.html" data-bs-toggle="" aria-expanded="false">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Spinners</span>
                          </div>
                        </a>
                        <!-- more inner pages-->
                      </li>
                      <li class="nav-item"><a class="nav-link" href="modules/components/toast.html" data-bs-toggle="" aria-expanded="false">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Toast</span>
                          </div>
                        </a>
                        <!-- more inner pages-->
                      </li>
                      <li class="nav-item"><a class="nav-link" href="modules/components/tooltips.html" data-bs-toggle="" aria-expanded="false">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Tooltips</span>
                          </div>
                        </a>
                        <!-- more inner pages-->
                      </li>
                      <li class="nav-item"><a class="nav-link" href="modules/components/chat-widget.html" data-bs-toggle="" aria-expanded="false">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Chat widget</span>
                          </div>
                        </a>
                        <!-- more inner pages-->
                      </li>
                    </ul>
                  </div>
                </div>
                <!-- parent pages-->
                <div class="nav-item-wrapper"><a class="nav-link dropdown-indicator label-1" href="#nv-utilities" role="button" data-bs-toggle="collapse" aria-expanded="false" aria-controls="nv-utilities">
                    <div class="d-flex align-items-center">
                      <div class="dropdown-indicator-icon"><span class="fas fa-caret-right"></span></div><span class="nav-link-icon"><span data-feather="tool"></span></span><span class="nav-link-text">Utilities</span>
                    </div>
                  </a>
                  <div class="parent-wrapper label-1">
                    <ul class="nav collapse parent" data-bs-parent="#navbarVerticalCollapse" id="nv-utilities">
                      <li class="collapsed-nav-item-title d-none">Utilities
                      </li>
                      <li class="nav-item"><a class="nav-link" href="modules/utilities/background.html" data-bs-toggle="" aria-expanded="false">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Background</span>
                          </div>
                        </a>
                        <!-- more inner pages-->
                      </li>
                      <li class="nav-item"><a class="nav-link" href="modules/utilities/borders.html" data-bs-toggle="" aria-expanded="false">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Borders</span>
                          </div>
                        </a>
                        <!-- more inner pages-->
                      </li>
                      <li class="nav-item"><a class="nav-link" href="modules/utilities/colors.html" data-bs-toggle="" aria-expanded="false">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Colors</span>
                          </div>
                        </a>
                        <!-- more inner pages-->
                      </li>
                      <li class="nav-item"><a class="nav-link" href="modules/utilities/display.html" data-bs-toggle="" aria-expanded="false">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Display</span>
                          </div>
                        </a>
                        <!-- more inner pages-->
                      </li>
                      <li class="nav-item"><a class="nav-link" href="modules/utilities/flex.html" data-bs-toggle="" aria-expanded="false">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Flex</span>
                          </div>
                        </a>
                        <!-- more inner pages-->
                      </li>
                      <li class="nav-item"><a class="nav-link" href="modules/utilities/stacks.html" data-bs-toggle="" aria-expanded="false">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Stacks</span>
                          </div>
                        </a>
                        <!-- more inner pages-->
                      </li>
                      <li class="nav-item"><a class="nav-link" href="modules/utilities/float.html" data-bs-toggle="" aria-expanded="false">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Float</span>
                          </div>
                        </a>
                        <!-- more inner pages-->
                      </li>
                      <li class="nav-item"><a class="nav-link" href="modules/utilities/grid.html" data-bs-toggle="" aria-expanded="false">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Grid</span>
                          </div>
                        </a>
                        <!-- more inner pages-->
                      </li>
                      <li class="nav-item"><a class="nav-link" href="modules/utilities/interactions.html" data-bs-toggle="" aria-expanded="false">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Interactions</span>
                          </div>
                        </a>
                        <!-- more inner pages-->
                      </li>
                      <li class="nav-item"><a class="nav-link" href="modules/utilities/opacity.html" data-bs-toggle="" aria-expanded="false">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Opacity</span>
                          </div>
                        </a>
                        <!-- more inner pages-->
                      </li>
                      <li class="nav-item"><a class="nav-link" href="modules/utilities/overflow.html" data-bs-toggle="" aria-expanded="false">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Overflow</span>
                          </div>
                        </a>
                        <!-- more inner pages-->
                      </li>
                      <li class="nav-item"><a class="nav-link" href="modules/utilities/position.html" data-bs-toggle="" aria-expanded="false">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Position</span>
                          </div>
                        </a>
                        <!-- more inner pages-->
                      </li>
                      <li class="nav-item"><a class="nav-link" href="modules/utilities/shadows.html" data-bs-toggle="" aria-expanded="false">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Shadows</span>
                          </div>
                        </a>
                        <!-- more inner pages-->
                      </li>
                      <li class="nav-item"><a class="nav-link" href="modules/utilities/sizing.html" data-bs-toggle="" aria-expanded="false">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Sizing</span>
                          </div>
                        </a>
                        <!-- more inner pages-->
                      </li>
                      <li class="nav-item"><a class="nav-link" href="modules/utilities/spacing.html" data-bs-toggle="" aria-expanded="false">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Spacing</span>
                          </div>
                        </a>
                        <!-- more inner pages-->
                      </li>
                      <li class="nav-item"><a class="nav-link" href="modules/utilities/typography.html" data-bs-toggle="" aria-expanded="false">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Typography</span>
                          </div>
                        </a>
                        <!-- more inner pages-->
                      </li>
                      <li class="nav-item"><a class="nav-link" href="modules/utilities/vertical-align.html" data-bs-toggle="" aria-expanded="false">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Vertical align</span>
                          </div>
                        </a>
                        <!-- more inner pages-->
                      </li>
                      <li class="nav-item"><a class="nav-link" href="modules/utilities/visibility.html" data-bs-toggle="" aria-expanded="false">
                          <div class="d-flex align-items-center"><span class="nav-link-text">Visibility</span>
                          </div>
                        </a>
                        <!-- more inner pages-->
                      </li>
                    </ul>
                  </div>
                </div>
                <!-- parent pages-->
                <div class="nav-item-wrapper"><a class="nav-link label-1" href="widgets.html" role="button" data-bs-toggle="" aria-expanded="false">
                    <div class="d-flex align-items-center"><span class="nav-link-icon"><span data-feather="server"></span></span><span class="nav-link-text-wrapper"><span class="nav-link-text">Widgets</span></span><span class="badge ms-2 badge badge-phoenix badge-phoenix-info nav-link-badge">New</span>
                    </div>
                  </a>
                </div>
                <!-- parent pages-->
                <div class="nav-item-wrapper"><a class="nav-link dropdown-indicator label-1" href="#nv-multi-level" role="button" data-bs-toggle="collapse" aria-expanded="false" aria-controls="nv-multi-level">
                    <div class="d-flex align-items-center">
                      <div class="dropdown-indicator-icon"><span class="fas fa-caret-right"></span></div><span class="nav-link-icon"><span data-feather="layers"></span></span><span class="nav-link-text">Multi level</span>
                    </div>
                  </a>
                  <div class="parent-wrapper label-1">
                    <ul class="nav collapse parent" data-bs-parent="#navbarVerticalCollapse" id="nv-multi-level">
                      <li class="collapsed-nav-item-title d-none">Multi level
                      </li>
                      <li class="nav-item"><a class="nav-link dropdown-indicator" href="#nv-level-two" data-bs-toggle="collapse" aria-expanded="false" aria-controls="nv-level-two">
                          <div class="d-flex align-items-center">
                            <div class="dropdown-indicator-icon"><span class="fas fa-caret-right"></span></div><span class="nav-link-text">Level two</span>
                          </div>
                        </a>
                        <!-- more inner pages-->
                        <div class="parent-wrapper">
                          <ul class="nav collapse parent" data-bs-parent="#multi-level" id="nv-level-two">
                            <li class="nav-item"><a class="nav-link" href="#!.html" data-bs-toggle="" aria-expanded="false">
                                <div class="d-flex align-items-center"><span class="nav-link-text">Item 1</span>
                                </div>
                              </a>
                              <!-- more inner pages-->
                            </li>
                            <li class="nav-item"><a class="nav-link" href="#!.html" data-bs-toggle="" aria-expanded="false">
                                <div class="d-flex align-items-center"><span class="nav-link-text">Item 2</span>
                                </div>
                              </a>
                              <!-- more inner pages-->
                            </li>
                          </ul>
                        </div>
                      </li>
                      <li class="nav-item"><a class="nav-link dropdown-indicator" href="#nv-level-three" data-bs-toggle="collapse" aria-expanded="false" aria-controls="nv-level-three">
                          <div class="d-flex align-items-center">
                            <div class="dropdown-indicator-icon"><span class="fas fa-caret-right"></span></div><span class="nav-link-text">Level three</span>
                          </div>
                        </a>
                        <!-- more inner pages-->
                        <div class="parent-wrapper">
                          <ul class="nav collapse parent" data-bs-parent="#multi-level" id="nv-level-three">
                            <li class="nav-item"><a class="nav-link" href="#!.html" data-bs-toggle="" aria-expanded="false">
                                <div class="d-flex align-items-center"><span class="nav-link-text">Item 3</span>
                                </div>
                              </a>
                              <!-- more inner pages-->
                            </li>
                            <li class="nav-item"><a class="nav-link dropdown-indicator" href="#nv-item-4" data-bs-toggle="collapse" aria-expanded="false" aria-controls="nv-item-4">
                                <div class="d-flex align-items-center">
                                  <div class="dropdown-indicator-icon"><span class="fas fa-caret-right"></span></div><span class="nav-link-text">Item 4</span>
                                </div>
                              </a>
                              <!-- more inner pages-->
                              <div class="parent-wrapper">
                                <ul class="nav collapse parent" data-bs-parent="#level-three" id="nv-item-4">
                                  <li class="nav-item"><a class="nav-link" href="#!.html" data-bs-toggle="" aria-expanded="false">
                                      <div class="d-flex align-items-center"><span class="nav-link-text">Item 5</span>
                                      </div>
                                    </a>
                                    <!-- more inner pages-->
                                  </li>
                                  <li class="nav-item"><a class="nav-link" href="#!.html" data-bs-toggle="" aria-expanded="false">
                                      <div class="d-flex align-items-center"><span class="nav-link-text">Item 6</span>
                                      </div>
                                    </a>
                                    <!-- more inner pages-->
                                  </li>
                                </ul>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </li>
                      <li class="nav-item"><a class="nav-link dropdown-indicator" href="#nv-level-four" data-bs-toggle="collapse" aria-expanded="false" aria-controls="nv-level-four">
                          <div class="d-flex align-items-center">
                            <div class="dropdown-indicator-icon"><span class="fas fa-caret-right"></span></div><span class="nav-link-text">Level four</span>
                          </div>
                        </a>
                        <!-- more inner pages-->
                        <div class="parent-wrapper">
                          <ul class="nav collapse parent" data-bs-parent="#multi-level" id="nv-level-four">
                            <li class="nav-item"><a class="nav-link" href="#!.html" data-bs-toggle="" aria-expanded="false">
                                <div class="d-flex align-items-center"><span class="nav-link-text">Item 6</span>
                                </div>
                              </a>
                              <!-- more inner pages-->
                            </li>
                            <li class="nav-item"><a class="nav-link dropdown-indicator" href="#nv-item-7" data-bs-toggle="collapse" aria-expanded="false" aria-controls="nv-item-7">
                                <div class="d-flex align-items-center">
                                  <div class="dropdown-indicator-icon"><span class="fas fa-caret-right"></span></div><span class="nav-link-text">Item 7</span>
                                </div>
                              </a>
                              <!-- more inner pages-->
                              <div class="parent-wrapper">
                                <ul class="nav collapse parent" data-bs-parent="#level-four" id="nv-item-7">
                                  <li class="nav-item"><a class="nav-link" href="#!.html" data-bs-toggle="" aria-expanded="false">
                                      <div class="d-flex align-items-center"><span class="nav-link-text">Item 8</span>
                                      </div>
                                    </a>
                                    <!-- more inner pages-->
                                  </li>
                                  <li class="nav-item"><a class="nav-link dropdown-indicator" href="#nv-item-9" data-bs-toggle="collapse" aria-expanded="false" aria-controls="nv-item-9">
                                      <div class="d-flex align-items-center">
                                        <div class="dropdown-indicator-icon"><span class="fas fa-caret-right"></span></div><span class="nav-link-text">Item 9</span>
                                      </div>
                                    </a>
                                    <!-- more inner pages-->
                                    <div class="parent-wrapper">
                                      <ul class="nav collapse parent" data-bs-parent="#item-7" id="nv-item-9">
                                        <li class="nav-item"><a class="nav-link" href="#!.html" data-bs-toggle="" aria-expanded="false">
                                            <div class="d-flex align-items-center"><span class="nav-link-text">Item 10</span>
                                            </div>
                                          </a>
                                          <!-- more inner pages-->
                                        </li>
                                        <li class="nav-item"><a class="nav-link" href="#!.html" data-bs-toggle="" aria-expanded="false">
                                            <div class="d-flex align-items-center"><span class="nav-link-text">Item 11</span>
                                            </div>
                                          </a>
                                          <!-- more inner pages-->
                                        </li>
                                      </ul>
                                    </div>
                                  </li>
                                </ul>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </li>
                    </ul>
                  </div>
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
            <a class="navbar-brand me-1 me-sm-3" href="index.html">
              <div class="d-flex align-items-center">
                <div class="d-flex align-items-center"><img src="/static/img/icons/logo.png" alt="phoenix" width="27" />
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
                      <h6 class="mt-2 text-black">Jerry Seinfield</h6>
                    </div>
                    <div class="mb-3 mx-3">
                      <input class="form-control form-control-sm" id="statusUpdateInput" type="text" placeholder="Update your status" />
                    </div>
                  </div>
                  <div class="overflow-auto scrollbar" style="height: 10rem;">
                    <ul class="nav d-flex flex-column mb-2 pb-1">
                      <li class="nav-item"><a class="nav-link px-3" href="#!"> <span class="me-2 text-900" data-feather="user"></span><span>Profile</span></a></li>
                      <li class="nav-item"><a class="nav-link px-3" href="#!"><span class="me-2 text-900" data-feather="pie-chart"></span>Dashboard</a></li>
                      <li class="nav-item"><a class="nav-link px-3" href="#!"> <span class="me-2 text-900" data-feather="lock"></span>Posts &amp; Activity</a></li>
                      <li class="nav-item"><a class="nav-link px-3" href="#!"> <span class="me-2 text-900" data-feather="settings"></span>Settings &amp; Privacy </a></li>
                      <li class="nav-item"><a class="nav-link px-3" href="#!"> <span class="me-2 text-900" data-feather="help-circle"></span>Help Center</a></li>
                      <li class="nav-item"><a class="nav-link px-3" href="#!"> <span class="me-2 text-900" data-feather="globe"></span>Language</a></li>
                    </ul>
                  </div>
                  <div class="card-footer p-0 border-top">
                    <ul class="nav d-flex flex-column my-3">
                      <li class="nav-item"><a class="nav-link px-3" href="#!"> <span class="me-2 text-900" data-feather="user-plus"></span>Add another account</a></li>
                    </ul>
                    <hr />
                    <div class="px-3"> <a class="btn btn-phoenix-secondary d-flex flex-center w-100" href="#!"> <span class="me-2" data-feather="log-out"> </span>Sign out</a></div>
                    <div class="my-2 text-center fw-bold fs--2 text-600"><a class="text-600 me-1" href="#!">Privacy policy</a>&bull;<a class="text-600 mx-1" href="#!">Terms</a>&bull;<a class="text-600 ms-1" href="#!">Cookies</a></div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </nav>
      <div class="modal fade" id="searchBoxModal" tabindex="-1" aria-hidden="true" data-bs-backdrop="true" data-phoenix-modal="data-phoenix-modal" style="--phoenix-backdrop-opacity: 1;">
        <div class="modal-dialog">
          <div class="modal-content mt-15 rounded-pill">
            <div class="modal-body p-0">
              <div class="search-box navbar-top-search-box" data-list='{"valueNames":["title"]}' style="width: auto;">
                <form class="position-relative" data-bs-toggle="search" data-bs-display="static">
                  <input class="form-control search-input fuzzy-search rounded-pill form-control-lg" type="search" placeholder="Search..." aria-label="Search" />
                  <span class="fas fa-search search-box-icon"></span>

                </form>
                <div class="btn-close position-absolute end-0 top-50 translate-middle cursor-pointer shadow-none" data-bs-dismiss="search">
                  <button class="btn btn-link btn-close-falcon p-0" aria-label="Close"></button>
                </div>
                <div class="dropdown-menu border border-300 font-base start-0 py-0 overflow-hidden w-100">
                  <div class="scrollbar-overlay" style="max-height: 30rem;">
                    <div class="list pb-3">
                      <h6 class="dropdown-header text-1000 fs--2 py-2">24 <span class="text-500">results</span></h6>
                      <hr class="text-200 my-0" />
                      <h6 class="dropdown-header text-1000 fs--1 border-bottom border-200 py-2 lh-sm">Recently Searched </h6>
                      <div class="py-2"><a class="dropdown-item" href="apps/e-commerce/landing/product-details.html">
                          <div class="d-flex align-items-center">

                            <div class="fw-normal text-1000 title"><span class="fa-solid fa-clock-rotate-left" data-fa-transform="shrink-2"></span> Store Macbook</div>
                          </div>
                        </a>
                        <a class="dropdown-item" href="apps/e-commerce/landing/product-details.html">
                          <div class="d-flex align-items-center">

                            <div class="fw-normal text-1000 title"> <span class="fa-solid fa-clock-rotate-left" data-fa-transform="shrink-2"></span> MacBook Air - 13″</div>
                          </div>
                        </a>

                      </div>
                      <hr class="text-200 my-0" />
                      <h6 class="dropdown-header text-1000 fs--1 border-bottom border-200 py-2 lh-sm">Products</h6>
                      <div class="py-2"><a class="dropdown-item py-2 d-flex align-items-center" href="apps/e-commerce/landing/product-details.html">
                          <div class="file-thumbnail me-2"><img class="h-100 w-100 fit-cover rounded-3" src="/static/img/products/60x60/3.png" alt="" /></div>
                          <div class="flex-1">
                            <h6 class="mb-0 text-1000 title">MacBook Air - 13″</h6>
                            <p class="fs--2 mb-0 d-flex text-700"><span class="fw-medium text-600">8GB Memory - 1.6GHz - 128GB Storage</span></p>
                          </div>
                        </a>
                        <a class="dropdown-item py-2 d-flex align-items-center" href="apps/e-commerce/landing/product-details.html">
                          <div class="file-thumbnail me-2"><img class="img-fluid" src="/static/img/products/60x60/3.png" alt="" /></div>
                          <div class="flex-1">
                            <h6 class="mb-0 text-1000 title">MacBook Pro - 13″</h6>
                            <p class="fs--2 mb-0 d-flex text-700"><span class="fw-medium text-600 ms-2">30 Sep at 12:30 PM</span></p>
                          </div>
                        </a>

                      </div>
                      <hr class="text-200 my-0" />
                      <h6 class="dropdown-header text-1000 fs--1 border-bottom border-200 py-2 lh-sm">Quick Links</h6>
                      <div class="py-2"><a class="dropdown-item" href="apps/e-commerce/landing/product-details.html">
                          <div class="d-flex align-items-center">

                            <div class="fw-normal text-1000 title"><span class="fa-solid fa-link text-900" data-fa-transform="shrink-2"></span> Support MacBook House</div>
                          </div>
                        </a>
                        <a class="dropdown-item" href="apps/e-commerce/landing/product-details.html">
                          <div class="d-flex align-items-center">

                            <div class="fw-normal text-1000 title"> <span class="fa-solid fa-link text-900" data-fa-transform="shrink-2"></span> Store MacBook″</div>
                          </div>
                        </a>

                      </div>
                      <hr class="text-200 my-0" />
                      <h6 class="dropdown-header text-1000 fs--1 border-bottom border-200 py-2 lh-sm">Files</h6>
                      <div class="py-2"><a class="dropdown-item" href="apps/e-commerce/landing/product-details.html">
                          <div class="d-flex align-items-center">

                            <div class="fw-normal text-1000 title"><span class="fa-solid fa-file-zipper text-900" data-fa-transform="shrink-2"></span> Library MacBook folder.rar</div>
                          </div>
                        </a>
                        <a class="dropdown-item" href="apps/e-commerce/landing/product-details.html">
                          <div class="d-flex align-items-center">

                            <div class="fw-normal text-1000 title"> <span class="fa-solid fa-file-lines text-900" data-fa-transform="shrink-2"></span> Feature MacBook extensions.txt</div>
                          </div>
                        </a>
                        <a class="dropdown-item" href="apps/e-commerce/landing/product-details.html">
                          <div class="d-flex align-items-center">

                            <div class="fw-normal text-1000 title"> <span class="fa-solid fa-image text-900" data-fa-transform="shrink-2"></span> MacBook Pro_13.jpg</div>
                          </div>
                        </a>

                      </div>
                      <hr class="text-200 my-0" />
                      <h6 class="dropdown-header text-1000 fs--1 border-bottom border-200 py-2 lh-sm">Members</h6>
                      <div class="py-2"><a class="dropdown-item py-2 d-flex align-items-center" href="pages/members.html">
                          <div class="avatar avatar-l status-online  me-2 text-900">
                            <img class="rounded-circle " src="/static/img/team/40x40/10.webp" alt="" />

                          </div>
                          <div class="flex-1">
                            <h6 class="mb-0 text-1000 title">Carry Anna</h6>
                            <p class="fs--2 mb-0 d-flex text-700">anna@technext.it</p>
                          </div>
                        </a>
                        <a class="dropdown-item py-2 d-flex align-items-center" href="pages/members.html">
                          <div class="avatar avatar-l  me-2 text-900">
                            <img class="rounded-circle " src="/static/img/team/40x40/12.webp" alt="" />

                          </div>
                          <div class="flex-1">
                            <h6 class="mb-0 text-1000 title">John Smith</h6>
                            <p class="fs--2 mb-0 d-flex text-700">smith@technext.it</p>
                          </div>
                        </a>

                      </div>
                      <hr class="text-200 my-0" />
                      <h6 class="dropdown-header text-1000 fs--1 border-bottom border-200 py-2 lh-sm">Related Searches</h6>
                      <div class="py-2"><a class="dropdown-item" href="apps/e-commerce/landing/product-details.html">
                          <div class="d-flex align-items-center">

                            <div class="fw-normal text-1000 title"><span class="fa-brands fa-firefox-browser text-900" data-fa-transform="shrink-2"></span> Search in the Web MacBook</div>
                          </div>
                        </a>
                        <a class="dropdown-item" href="apps/e-commerce/landing/product-details.html">
                          <div class="d-flex align-items-center">

                            <div class="fw-normal text-1000 title"> <span class="fa-brands fa-chrome text-900" data-fa-transform="shrink-2"></span> Store MacBook″</div>
                          </div>
                        </a>

                      </div>
                    </div>
                    <div class="text-center">
                      <p class="fallback fw-bold fs-1 d-none">No Result Found.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="pb-5">
          <div class="row g-4">
            <div class="col-12 col-xxl-6">
              <div class="mb-8">
                <h2 class="mb-2">Dashboard</h2>
                <h5 class="text-700 fw-semi-bold">Here’s what’s going on at your business right now</h5>
              </div>
              <div class="row align-items-center g-4">
                <div class="col-12 col-md-auto">
                  <div class="d-flex align-items-center"><span class="fa-stack" style="min-height: 46px;min-width: 46px;"><span class="fa-solid fa-square fa-stack-2x text-success-300" data-fa-transform="down-4 rotate--10 left-4"></span><span class="fa-solid fa-circle fa-stack-2x stack-circle text-success-100" data-fa-transform="up-4 right-3 grow-2"></span><span class="fa-stack-1x fa-solid fa-star text-success " data-fa-transform="shrink-2 up-8 right-6"></span></span>
                    <div class="ms-3">
                      <h4 class="mb-0">57 new orders</h4>
                      <p class="text-800 fs--1 mb-0">Awating processing</p>
                    </div>
                  </div>
                </div>
                <div class="col-12 col-md-auto">
                  <div class="d-flex align-items-center"><span class="fa-stack" style="min-height: 46px;min-width: 46px;"><span class="fa-solid fa-square fa-stack-2x text-warning-300" data-fa-transform="down-4 rotate--10 left-4"></span><span class="fa-solid fa-circle fa-stack-2x stack-circle text-warning-100" data-fa-transform="up-4 right-3 grow-2"></span><span class="fa-stack-1x fa-solid fa-pause text-warning " data-fa-transform="shrink-2 up-8 right-6"></span></span>
                    <div class="ms-3">
                      <h4 class="mb-0">5 orders</h4>
                      <p class="text-800 fs--1 mb-0">On hold</p>
                    </div>
                  </div>
                </div>
                <div class="col-12 col-md-auto">
                  <div class="d-flex align-items-center"><span class="fa-stack" style="min-height: 46px;min-width: 46px;"><span class="fa-solid fa-square fa-stack-2x text-danger-300" data-fa-transform="down-4 rotate--10 left-4"></span><span class="fa-solid fa-circle fa-stack-2x stack-circle text-danger-100" data-fa-transform="up-4 right-3 grow-2"></span><span class="fa-stack-1x fa-solid fa-xmark text-danger " data-fa-transform="shrink-2 up-8 right-6"></span></span>
                    <div class="ms-3">
                      <h4 class="mb-0">15 products</h4>
                      <p class="text-800 fs--1 mb-0">Out of stock</p>
                    </div>
                  </div>
                </div>
              </div>
              <hr class="bg-200 mb-6 mt-4" />
              <div class="row flex-between-center mb-4 g-3">
                <div class="col-auto">
                  <h3>SOL/USDC</h3>
                  <p class="text-700 lh-sm mb-0">Payment received across all channels</p>
                </div>
                <div class="col-8 col-sm-4">
                  <select class="form-select form-select-sm mt-2" id="select-gross-revenue-month">
                    <option>Mar 1 - 31, 2022</option>
                    <option>April 1 - 30, 2022</option>
                    <option>May 1 - 31, 2022</option>
                  </select>
                </div>
              </div>
              <div class="echart-total-sales-chart" style="min-height:320px;width:100%"></div>
            </div>
            <div class="col-12 col-xxl-6">
              <div class="row g-3">
                <div class="col-12 col-md-6">
                  <div class="card h-100">
                    <div class="card-body">
                      <div class="d-flex justify-content-between">
                        <div>
                          <h5 class="mb-1">Solana TPS<span class="badge badge-phoenix badge-phoenix-warning rounded-pill fs--1 ms-2"><span class="badge-label">-6.8%</span></span></h5>
                          <h6 class="text-700">Last 7 days</h6>
                        </div>
                        <h4>16,247</h4>
                      </div>
                      <div class="d-flex justify-content-center px-4 py-6">
                        <div class="echart-total-orders" style="height:85px;width:115px"></div>
                      </div>
                      <div class="mt-2">
                        <div class="d-flex align-items-center mb-2">
                          <div class="bullet-item bg-primary me-2"></div>
                          <h6 class="text-900 fw-semi-bold flex-1 mb-0">Completed</h6>
                          <h6 class="text-900 fw-semi-bold mb-0">52%</h6>
                        </div>
                        <div class="d-flex align-items-center">
                          <div class="bullet-item bg-primary-100 me-2"></div>
                          <h6 class="text-900 fw-semi-bold flex-1 mb-0">Pending payment</h6>
                          <h6 class="text-900 fw-semi-bold mb-0">48%</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-12 col-md-6">
                  <div class="card h-100">
                    <div class="card-body">
                      <div class="d-flex justify-content-between">
                        <div>
                          <h5 class="mb-1">Account PnL<span class="badge badge-phoenix badge-phoenix-warning rounded-pill fs--1 ms-2"> <span class="badge-label">+26.5%</span></span></h5>
                          <h6 class="text-700">Last 7 days</h6>
                        </div>
                        <h4>356</h4>
                      </div>
                      <div class="pb-0 pt-4">
                        <div class="echarts-new-customers" style="height:180px;width:100%;"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-12 col-md-6">
                  <div class="card h-100">
                    <div class="card-body">
                      <div class="d-flex justify-content-between">
                        <div>
                          <h5 class="mb-2">Account Volume</h5>
                          <h6 class="text-700">Last 7 days</h6>
                        </div>
                      </div>
                      <div class="pb-4 pt-3">
                        <div class="echart-top-coupons" style="height:115px;width:100%;"></div>
                      </div>
                      <div>
                        <div class="d-flex align-items-center mb-2">
                          <div class="bullet-item bg-primary me-2"></div>
                          <h6 class="text-900 fw-semi-bold flex-1 mb-0">Percentage discount</h6>
                          <h6 class="text-900 fw-semi-bold mb-0">72%</h6>
                        </div>
                        <div class="d-flex align-items-center mb-2">
                          <div class="bullet-item bg-primary-200 me-2"></div>
                          <h6 class="text-900 fw-semi-bold flex-1 mb-0">Fixed card discount</h6>
                          <h6 class="text-900 fw-semi-bold mb-0">18%</h6>
                        </div>
                        <div class="d-flex align-items-center">
                          <div class="bullet-item bg-info-500 me-2"></div>
                          <h6 class="text-900 fw-semi-bold flex-1 mb-0">Fixed product discount</h6>
                          <h6 class="text-900 fw-semi-bold mb-0">10%</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-12 col-md-6">
                  <div class="card h-100">
                    <div class="card-body d-flex flex-column">
                      <div class="d-flex justify-content-between">
                        <div>
                          <h5 class="mb-2">Arcana Premium</h5>
                          <h6 class="text-700">Last 7 days</h6>
                        </div>
                      </div>
                      <div class="d-flex justify-content-center pt-3 flex-1">
                        <div class="echarts-paying-customer-chart" style="height:100%;width:100%;"></div>
                      </div>
                      <div class="mt-3">
                        <div class="d-flex align-items-center mb-2">
                          <div class="bullet-item bg-primary me-2"></div>
                          <h6 class="text-900 fw-semi-bold flex-1 mb-0">Paying customer</h6>
                          <h6 class="text-900 fw-semi-bold mb-0">30%</h6>
                        </div>
                        <div class="d-flex align-items-center">
                          <div class="bullet-item bg-primary-100 me-2"></div>
                          <h6 class="text-900 fw-semi-bold flex-1 mb-0">Non-paying customer</h6>
                          <h6 class="text-900 fw-semi-bold mb-0">70%</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="mx-n4 px-4 mx-lg-n6 px-lg-6 bg-white pt-7 border-y border-300">
          <div data-list='{"valueNames":["product","customer","rating","review","time"],"page":6}'>
            <div class="row align-items-end justify-content-between pb-5 g-3">
              <div class="col-auto">
                <h3>My Bots</h3>
                <p class="text-700 lh-sm mb-0">Payment received across all channels</p>
              </div>
              <div class="col-12 col-md-auto">
                <div class="row g-2 gy-3">
                  <div class="col-auto flex-1">
                    <div class="search-box">
                      <form class="position-relative" data-bs-toggle="search" data-bs-display="static">
                        <input class="form-control search-input search form-control-sm" type="search" placeholder="Search" aria-label="Search" />
                        <span class="fas fa-search search-box-icon"></span>

                      </form>
                    </div>
                  </div>
                  <div class="col-auto">
                    <button class="btn btn-sm btn-phoenix-secondary bg-white hover-bg-100 me-2" type="button">All products</button>
                    <button class="btn btn-sm btn-phoenix-secondary bg-white hover-bg-100 action-btn" type="button" data-bs-toggle="dropdown" data-boundary="window" aria-haspopup="true" aria-expanded="false" data-bs-reference="parent"><span class="fas fa-ellipsis-h" data-fa-transform="shrink-2"></span></button>
                    <ul class="dropdown-menu dropdown-menu-end">
                      <li><a class="dropdown-item" href="#">Action</a></li>
                      <li><a class="dropdown-item" href="#">Another action</a></li>
                      <li><a class="dropdown-item" href="#">Something else here</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="table-responsive mx-n1 px-1 scrollbar">
              <table class="table fs--1 mb-0 border-top border-200">
                <thead>
                  <tr>
                    <th class="white-space-nowrap fs--1 ps-0 align-middle">
                      <div class="form-check mb-0 fs-0">
                        <input class="form-check-input" id="checkbox-bulk-reviews-select" type="checkbox" data-bulk-select='{"body":"table-latest-review-body"}' />
                      </div>
                    </th>
                    <th class="sort white-space-nowrap align-middle" scope="col"></th>
                    <th class="sort white-space-nowrap align-middle" scope="col" style="min-width:360px;" data-sort="product">PRODUCT</th>
                    <th class="sort align-middle" scope="col" data-sort="customer" style="min-width:200px;">CUSTOMER</th>
                    <th class="sort align-middle" scope="col" data-sort="rating" style="min-width:110px;">RATING</th>
                    <th class="sort align-middle" scope="col" style="max-width:350px;" data-sort="review">REVIEW</th>
                    <th class="sort text-start ps-5 align-middle" scope="col" data-sort="status">STATUS</th>
                    <th class="sort text-end align-middle" scope="col" data-sort="time">TIME</th>
                    <th class="sort text-end pe-0 align-middle" scope="col"></th>
                  </tr>
                </thead>
                <tbody class="list" id="table-latest-review-body">
                  <tr class="hover-actions-trigger btn-reveal-trigger position-static">
                    <td class="fs--1 align-middle ps-0">
                      <div class="form-check mb-0 fs-0">
                        <input class="form-check-input" type="checkbox" data-bulk-select-row='{"product":"Fitbit Sense Advanced Smartwatch with Tools for Heart Health, Stress Management & Skin Temperature Trends, Carbon/Graphite, One Size (S & L Bands)","productImage":"/products/60x60/1.png","customer":{"name":"Richard Dawkins","avatar":""},"rating":5,"review":"This Fitbit is fantastic! I was trying to be in better shape and needed some motivation, so I decided to treat myself to a new Fitbit.","status":{"title":"Approved","badge":"success","icon":"check"},"time":"Just now"}' />
                      </div>
                    </td>
                    <td class="align-middle product white-space-nowrap py-0"><a class="d-block rounded-2 border" href="apps/e-commerce/landing/product-details.html"><img src="/static/img//products/60x60/1.png" alt="" width="53" /></a></td>
                    <td class="align-middle product white-space-nowrap"><a class="fw-semi-bold" href="apps/e-commerce/landing/product-details.html">Fitbit Sense Advanced Smartwatch with Tools fo...</a></td>
                    <td class="align-middle customer white-space-nowrap"><a class="d-flex align-items-center text-900" href="apps/e-commerce/landing/profile.html">
                        <div class="avatar avatar-l">
                          <div class="avatar-name rounded-circle"><span>R</span></div>
                        </div>
                        <h6 class="mb-0 ms-3 text-900">Richard Dawkins</h6>
                      </a></td>
                    <td class="align-middle rating white-space-nowrap fs--2"><span class="fa fa-star text-warning"></span><span class="fa fa-star text-warning"></span><span class="fa fa-star text-warning"></span><span class="fa fa-star text-warning"></span><span class="fa fa-star text-warning"></span>
                    </td>
                    <td class="align-middle review" style="min-width:350px;">
                      <p class="fs--1 fw-semi-bold text-1000 mb-0">This Fitbit is fantastic! I was trying to be in better shape and needed some motivation, so I decided to treat myself to a new Fitbit.</p>
                    </td>
                    <td class="align-middle text-start ps-5 status"><span class="badge badge-phoenix fs--2 badge-phoenix-success"><span class="badge-label">Approved</span><span class="ms-1" data-feather="check" style="height:12.8px;width:12.8px;"></span></span></td>
                    <td class="align-middle text-end time white-space-nowrap">
                      <div class="hover-hide">
                        <h6 class="text-1000 mb-0">Just now</h6>
                      </div>
                    </td>
                    <td class="align-middle white-space-nowrap text-end pe-0">
                      <div class="position-relative">
                        <div class="hover-actions">
                          <button class="btn btn-sm btn-phoenix-secondary me-1 fs--2"><span class="fas fa-check"></span></button>
                          <button class="btn btn-sm btn-phoenix-secondary fs--2"><span class="fas fa-trash"></span></button>
                        </div>
                      </div>
                      <div class="font-sans-serif btn-reveal-trigger position-static">
                        <button class="btn btn-sm dropdown-toggle dropdown-caret-none transition-none btn-reveal fs--2" type="button" data-bs-toggle="dropdown" data-boundary="window" aria-haspopup="true" aria-expanded="false" data-bs-reference="parent"><span class="fas fa-ellipsis-h fs--2"></span></button>
                        <div class="dropdown-menu dropdown-menu-end py-2"><a class="dropdown-item" href="#!">View</a><a class="dropdown-item" href="#!">Export</a>
                          <div class="dropdown-divider"></div><a class="dropdown-item text-danger" href="#!">Remove</a>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr class="hover-actions-trigger btn-reveal-trigger position-static">
                    <td class="fs--1 align-middle ps-0">
                      <div class="form-check mb-0 fs-0">
                        <input class="form-check-input" type="checkbox" data-bulk-select-row='{"product":"iPhone 13 pro max-Pacific Blue-128GB storage","productImage":"/products/60x60/2.png","customer":{"name":"Ashley Garrett","avatar":"/team/40x40/59.webp"},"rating":3,"review":"The order was delivered ahead of schedule. To give us additional time, you should leave the packaging sealed with plastic.","status":{"title":"Approved","badge":"success","icon":"check"},"time":"Just now"}' />
                      </div>
                    </td>
                    <td class="align-middle product white-space-nowrap py-0"><a class="d-block rounded-2 border" href="apps/e-commerce/landing/product-details.html"><img src="/static/img//products/60x60/2.png" alt="" width="53" /></a></td>
                    <td class="align-middle product white-space-nowrap"><a class="fw-semi-bold" href="apps/e-commerce/landing/product-details.html">iPhone 13 pro max-Pacific Blue-128GB storage</a></td>
                    <td class="align-middle customer white-space-nowrap"><a class="d-flex align-items-center text-900" href="apps/e-commerce/landing/profile.html">
                        <div class="avatar avatar-l"><img class="rounded-circle" src="/static/img/team/40x40/59.webp" alt="" />
                        </div>
                        <h6 class="mb-0 ms-3 text-900">Ashley Garrett</h6>
                      </a></td>
                    <td class="align-middle rating white-space-nowrap fs--2"><span class="fa fa-star text-warning"></span><span class="fa fa-star text-warning"></span><span class="fa fa-star text-warning"></span><span class="fa-regular fa-star text-warning-300"></span><span class="fa-regular fa-star text-warning-300"></span>
                    </td>
                    <td class="align-middle review" style="min-width:350px;">
                      <p class="fs--1 fw-semi-bold text-1000 mb-0">The order was delivered ahead of schedule. To give us additional time, you should leave the packaging sealed with plastic.</p>
                    </td>
                    <td class="align-middle text-start ps-5 status"><span class="badge badge-phoenix fs--2 badge-phoenix-success"><span class="badge-label">Approved</span><span class="ms-1" data-feather="check" style="height:12.8px;width:12.8px;"></span></span></td>
                    <td class="align-middle text-end time white-space-nowrap">
                      <div class="hover-hide">
                        <h6 class="text-1000 mb-0">Just now</h6>
                      </div>
                    </td>
                    <td class="align-middle white-space-nowrap text-end pe-0">
                      <div class="position-relative">
                        <div class="hover-actions">
                          <button class="btn btn-sm btn-phoenix-secondary me-1 fs--2"><span class="fas fa-check"></span></button>
                          <button class="btn btn-sm btn-phoenix-secondary fs--2"><span class="fas fa-trash"></span></button>
                        </div>
                      </div>
                      <div class="font-sans-serif btn-reveal-trigger position-static">
                        <button class="btn btn-sm dropdown-toggle dropdown-caret-none transition-none btn-reveal fs--2" type="button" data-bs-toggle="dropdown" data-boundary="window" aria-haspopup="true" aria-expanded="false" data-bs-reference="parent"><span class="fas fa-ellipsis-h fs--2"></span></button>
                        <div class="dropdown-menu dropdown-menu-end py-2"><a class="dropdown-item" href="#!">View</a><a class="dropdown-item" href="#!">Export</a>
                          <div class="dropdown-divider"></div><a class="dropdown-item text-danger" href="#!">Remove</a>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr class="hover-actions-trigger btn-reveal-trigger position-static">
                    <td class="fs--1 align-middle ps-0">
                      <div class="form-check mb-0 fs-0">
                        <input class="form-check-input" type="checkbox" data-bulk-select-row='{"product":"Apple MacBook Pro 13 inch-M1-8/256GB-space","productImage":"/products/60x60/3.png","customer":{"name":"Woodrow Burton","avatar":"/team/40x40/58.webp"},"rating":4.5,"review":"It&#39;s a Mac, after all. Once you&#39;ve gone Mac, there&#39;s no going back. My first Mac lasted over nine years, and this is my second.","status":{"title":"Pending","badge":"warning","icon":"clock"},"time":"Just now"}' />
                      </div>
                    </td>
                    <td class="align-middle product white-space-nowrap py-0"><a class="d-block rounded-2 border" href="apps/e-commerce/landing/product-details.html"><img src="/static/img//products/60x60/3.png" alt="" width="53" /></a></td>
                    <td class="align-middle product white-space-nowrap"><a class="fw-semi-bold" href="apps/e-commerce/landing/product-details.html">Apple MacBook Pro 13 inch-M1-8/256GB-space</a></td>
                    <td class="align-middle customer white-space-nowrap"><a class="d-flex align-items-center text-900" href="apps/e-commerce/landing/profile.html">
                        <div class="avatar avatar-l"><img class="rounded-circle" src="/static/img/team/40x40/58.webp" alt="" />
                        </div>
                        <h6 class="mb-0 ms-3 text-900">Woodrow Burton</h6>
                      </a></td>
                    <td class="align-middle rating white-space-nowrap fs--2"><span class="fa fa-star text-warning"></span><span class="fa fa-star text-warning"></span><span class="fa fa-star text-warning"></span><span class="fa fa-star text-warning"></span><span class="fa fa-star-half-alt star-icon text-warning"></span>
                    </td>
                    <td class="align-middle review" style="min-width:350px;">
                      <p class="fs--1 fw-semi-bold text-1000 mb-0">It's a Mac, after all. Once you've gone Mac, there's no going back. My first Mac lasted over nine years, and this is my second.</p>
                    </td>
                    <td class="align-middle text-start ps-5 status"><span class="badge badge-phoenix fs--2 badge-phoenix-warning"><span class="badge-label">Pending</span><span class="ms-1" data-feather="clock" style="height:12.8px;width:12.8px;"></span></span></td>
                    <td class="align-middle text-end time white-space-nowrap">
                      <div class="hover-hide">
                        <h6 class="text-1000 mb-0">Just now</h6>
                      </div>
                    </td>
                    <td class="align-middle white-space-nowrap text-end pe-0">
                      <div class="position-relative">
                        <div class="hover-actions">
                          <button class="btn btn-sm btn-phoenix-secondary me-1 fs--2"><span class="fas fa-check"></span></button>
                          <button class="btn btn-sm btn-phoenix-secondary fs--2"><span class="fas fa-trash"></span></button>
                        </div>
                      </div>
                      <div class="font-sans-serif btn-reveal-trigger position-static">
                        <button class="btn btn-sm dropdown-toggle dropdown-caret-none transition-none btn-reveal fs--2" type="button" data-bs-toggle="dropdown" data-boundary="window" aria-haspopup="true" aria-expanded="false" data-bs-reference="parent"><span class="fas fa-ellipsis-h fs--2"></span></button>
                        <div class="dropdown-menu dropdown-menu-end py-2"><a class="dropdown-item" href="#!">View</a><a class="dropdown-item" href="#!">Export</a>
                          <div class="dropdown-divider"></div><a class="dropdown-item text-danger" href="#!">Remove</a>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="row align-items-center py-1">
              <div class="pagination d-none"></div>
              <div class="col d-flex fs--1">
                <p class="mb-0 d-none d-sm-block me-3 fw-semi-bold text-900" data-list-info="data-list-info"></p><a class="fw-semi-bold" href="#!" data-list-view="*">View all<span class="fas fa-angle-right ms-1" data-fa-transform="down-1"></span></a><a class="fw-semi-bold d-none" href="#!" data-list-view="less">View Less</a>
              </div>
              <div class="col-auto d-flex">

                <button class="btn btn-link px-1 me-1" type="button" title="Previous" data-list-pagination="prev"><span class="fas fa-chevron-left me-2"></span>Previous</button>
                <button class="btn btn-link px-1 ms-1" type="button" title="Next" data-list-pagination="next">Next<span class="fas fa-chevron-right ms-2"></span></button>
              </div>
            </div>
          </div>
        </div>
        <footer class="footer position-fixed z-index:1000 bg-white">
          <div class="row g-0 justify-content-between align-items-center h-100">
            <div class="col-12 col-sm-auto text-center">
              <p class="mb-0 mt-2 mt-sm-0 text-900">cool arcana stuff goes here<span class="d-none d-sm-inline-block"></span><span class="d-none d-sm-inline-block mx-1">|</span><br class="d-sm-none" />2023 &copy;<a class="mx-1" href="https://themewagon.com">and here</a></p>
            </div>
            <div class="col-12 col-sm-auto text-center">
              <p class="mb-0 text-600">twitter telegram logos here</p>
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
      </div>
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
    <script src="/static/phoenix.js"></script>
    <script src="/static/vendors/echarts/echarts.min.js"></script>
    <script src="/static/vendors/leaflet/leaflet.js"></script>
    <script src="/static/vendors/leaflet.markercluster/leaflet.markercluster.js"></script>
    <script src="/static/vendors/leaflet.tilelayer.colorfilter/leaflet-tilelayer-colorfilter.min.js"></script>
    <script src="/static/ecommerce-dashboard.js"></script>

  </body>

</html>
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="Mark Otto, Jacob Thornton, and Bootstrap contributors">
    <meta name="generator" content="Hugo 0.84.0">
    <title>🧙‍♂️ Arcana on Solana</title>

    <link rel="canonical" href="https://getbootstrap.com/docs/5.0/examples/navbar-fixed/">


    <!-- Bootstrap core CSS -->
    <link href="../static/bootstrap.min.css" rel="stylesheet">

    <style>
        .bd-placeholder-img {
            font-size: 1.125rem;
            text-anchor: middle;
            -webkit-user-select: none;
            -moz-user-select: none;
            user-select: none;
        }

        @media (min-width: 768px) {
            .bd-placeholder-img-lg {
                font-size: 3.5rem;
            }
        }
    </style>


    <!-- Custom styles for this template -->
    <link href="../static/navbar-top-fixed.css" rel="stylesheet">
</head>
<body>

<nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
    <div class="container-fluid">
        <a class="navbar-brand" href="#">🧙‍♂️ Arcana</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse"
                aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
            <ul class="navbar-nav me-auto mb-2 mb-md-0">
                <li class="nav-item">
                    <a class="nav-link" href="/">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/bots/add">✨ Strategies</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="/openbook">OpenBook</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/settings">Settings</a>
                </li>
            </ul>
            <div class="d-flex navbar-text">
                RPC: <span th:text="${rpcEndpoint}" style="padding-left: 4px"></span>
            </div>
        </div>
    </div>
</nav>

<main class="container">
    <div class="rounded">
        <h2>🏴‍☠️ OpenBook Markets (<span th:text="${#lists.size(markets)}">0</span> markets)</h2>
        <table>
            <tr>
                <th>#</th>
                <th>Market ID</th>
                <th>Base Token</th>
                <th>Quote Token</th>
                <th>Rebates Accrued</th>
                <th>Strategy</th>
            </tr>
            <tr th:each="market, state : ${markets}">
                <td th:text="${state.count}"></td>
                <td th:text="${market.ownAddress}"></td>
                <td th:text="${market.baseMint}"></td>
                <td th:text="${market.quoteMint}"></td>
                <td th:text="${market.referrerRebatesAccrued}"></td>
                <td><a th:href="${'/bots/add?marketId=' + market.ownAddress}" class="btn btn-primary">Add
                    Strategy</a></td>
            </tr>
        </table>
    </div>
</main>


<script src="../static/bootstrap.bundle.min.js"></script>


</body>
</html>

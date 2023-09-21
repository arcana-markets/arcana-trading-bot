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
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.0/jquery.min.js"></script>
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
                    <a class="nav-link active" aria-current="page" href="/bots/add">✨ Strategies</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/openbook">OpenBook</a>
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
    <div class="bg-light p-5 rounded">
        <h2>Start New Bot</h2>
        <form class="form" action="#" method="POST" th:action="@{/bots/add/post}" th:object="${newBot}">
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="inputAddress">Market ID</label>
                    <input type="text" class="form-control" id="inputAddress" th:field="*{marketId}">
                    <label for="presetMarkets">Preset Markets</label>
                    <select id="presetMarkets">
                        <option value="">Select a Market</option>
                        <option value="8BnEgHoWFysVcuFFX7QztDmzuH8r5ZFvyP3sYwn1XTh6">SOL/USDC</option>
                        <option value="9Lyhks5bQQxb9EyyX55NtgKQzpM4WK7JCmeaWuQ5MoXD">MSOL/USDC</option>
                        <option value="BbJgE7HZMaDp5NTYvRh5jZSkQPVDTU8ubPFtpogUkEj4">ETH/USDC</option>
                        <option value="3BAKsQd3RuhZKES2DGysMhjBdwjZYKYmxRqnSMtZ4KSN">WBTC/USDC</option>
                        <option value="72h8rWaWwfPUL36PAFqyQZU8RT1V3FKG7Nc45aK89xTs">RLB/USDC</option>
                        <option value="3NnxQvDcZXputNMxaxsGvqiKpqgPfSYXpNigZNFcknmD">MNGO/USDC</option>
                        <option value="JAmhJbmBzLp2aTp9mNJodPsTcpCJsmq5jpr6CuCbWHvR">JitoSOL/USDC</option>
                    </select>
                    <script>
                        $("#presetMarkets").on('change', function() {
                            $("#inputAddress").val(this.value);
                        });
                    </script>
                </div>
                <div class="form-group col-md-6">
                    <label for="inputAddress2">Basis Points Spread</label>
                    <input type="text" class="form-control" id="inputAddress2" th:field="*{bpsSpread}">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-4">
                    <label for="amountBid">Bid Amount</label>
                    <input type="text" class="form-control" id="amountBid" th:field="*{amountBid}">
                </div>
                <div class="form-group col-md-4">
                    <label for="amountAsk">Ask Amount</label>
                    <input type="text" class="form-control" id="amountAsk" th:field="*{amountAsk}">
                </div>
                <div class="form-group col-md-4">
                    <label for="priceStrategy">Pricing Strategy</label>
                    <select id="priceStrategy" th:field="*{priceStrategy}">
                        <option th:value="'jupiter'" th:text="'Jupiter + Spread'"></option>
                        <option th:value="'tob'" th:text="'Top of Book + Spread'"></option>
                    </select>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-12">
                    <input type="button" id="autoFillButton" value="Autofill accounts (0-30 seconds)"
                           onclick="autoFill()"/>
                    <script>
                        function autoFill() {
                            $("#autoFillButton").prop('disabled', true);
                            var marketId = $("#inputAddress").val();
                            $.get('/getAccountsByMarket/' + marketId, function (data,
                                                                                textStatus,
                                                                                jqXHR) {
                                $("#baseWallet").val(data.baseWallet);
                                $("#quoteWallet").val(data.quoteWallet);
                                $("#ooa").val(data.ooa);
                                $("#autoFillButton").prop('disabled', false);
                            }).fail(function() {
                                $("#autoFillButton").prop('disabled', false);
                            });
                        }
                    </script>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-4">
                    <label for="ooa">Open Orders Account</label>
                    <input type="text" class="form-control" id="ooa" th:field="*{ooa}">
                </div>
                <div class="form-group col-md-4">
                    <label for="baseWallet">Base Wallet</label>
                    <input type="text" class="form-control" id="baseWallet" th:field="*{baseWallet}">
                </div>
                <div class="form-group col-md-4">
                    <label for="quoteWallet">Quote Wallet</label>
                    <input type="text" class="form-control" id="quoteWallet" th:field="*{quoteWallet}">
                </div>
            </div>
            <button type="submit" class="btn btn-primary">Start New Bot</button>
        </form>
    </div>
</main>


<script src="../static/bootstrap.bundle.min.js"></script>


</body>
</html>

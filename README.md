# arcana-trading-bot

![GitHub](https://img.shields.io/github/license/makolabs-xyz/arcana)
![GitHub issues](https://img.shields.io/github/issues/makolabs-xyz/arcana)

the arcana-trading-bot is a Java-based interface for seamless interaction with automated marketing making bots on the Solana blockchain. 

Accessible via app download or Docker, this off-chain solution ensures secure, local client operations with no private information retention.

![Arcana Markets Interface](https://github.com/makolabs-xyz/arcana/assets/90412655/272b4237-79f6-4cb6-a58a-155bda194cbc)

## Setup - Choose your preferred setup

### Java App
1. Download the latest JDK (Java Development Kit) from [here](https://www.oracle.com/java/technologies/javase-jdk15-downloads.html).
2. Download the Arcana Java App from [here](https://github.com/makolabs-xyz/arcana/releases/download/1.1/arcana-1.0.jar).
3. Run the Arcana App, then access it from any web browser by navigating to `localhost:8080`.
4. When finished with your session, hit Ctrl + Shift + Escape and end the Java process.

### Docker Desktop
1. Download Docker Desktop [here](https://www.docker.com/products/docker-desktop/)
2. Search for `mmorrell/arcana` in the Docker Hub.
3. Run the Docker container, and you can access Arcana from any web browser at `localhost:8080`.
4. When finished, you can simply close the Docker app.

## Account Wallet Configuration

### Private Key Setup
the arcana-trading-bot is your own custom market-making software, and thus requires direct control of a Solana-based wallet to function in an offchain environment.
Users will need to input a wallet private key string in order to establish a connection with their local arcana interface.

> **NOTE**: Your private key is sensitive information. Never share it with anyone, and ensure it's stored in a secure, offline environment.
> > If you want to remove the wallet keys from your arcana session, you can clear the local storage cache in Account Settings.

### New User Reccomendation
For new users looking to test bot, we recommend the following;
- Create a new Phantom wallet in your web browser
- Navigate to settings and export your Private Key
- Input the Key into your arcana Account Settings

You will now have the option to access this wallet on future use of arcana, for that specific device.
Once that wallet has been credited with some SOL and USDC, you'll be able to utilize the bot 'Wizard' to create new trading bots.


#### Command Line Interface (CLI) wallets
CLI wallet users have the option to import their private key via JSON file if preferred.

## Features

- **Automated Trading:** Trade across a variety of market pairs, automatically, with our robust trading bots.
- **Secure:** Offchain solution ensures secure local client operations with no private information retention.
- **Interactive UI:** Navigate through the platform effortlessly and track your data.
- **Add Multiple Bots:** Add multiple bots, each tailored to different market conditions.
- **Open Source:** Dive into our codebase and contribute to the evolution of decentralized trading on Solana.
- **Customize Strategies:** Tailor your trading approach by selecting from our built-in strategies.

## Usage

1. **Standard Market Making:** Utilize market making strategies to provide liquidity and earn on the spread.
2. **High Frequency Trading (HFT):** Engage in high frequency trading to exploit small price differences.
4. **Strategy Selection:** Choose a pre-built trading strategy or customize your own.
5. **Trade Execution:** Monitor and manage your trading bots in real-time.

## Development

This project is built with:

- [Java](https://www.java.com/en/)
- [Bootstrap](https://getbootstrap.com/)
- [Solana](https://solana.com/)

## Contributing

We welcome contributions to Arcana Markets! Please feel free to raise an issue or open a PR.

## License

This project is [MIT licensed](LICENSE).

## Contact

For any inquiries, please reach out:

- [Email](mailto:hello@makolabs.xyz)
- [GitHub](https://github.com/makolabs-xyz)
- [X](https://twitter.com/arcanamarkets)

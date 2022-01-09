# Crypto Mining Rig Manager
<b><i>(Work in progress)</i></b>
<br>
<b>Click <a href="https://christopherdai.com/Projects/rigmanager">here</a> to try out</b>

<br>

<h3>Project Description</h3>

RigManager is the one-stop shop for monitoring cryptocurrency miners mining Ethereum (ETH). Miners can view the current statistics of their rig with their ETH address and/or add multiple addresses into the dashboard to view multiple workers on one page.

<h3>What problem this project solves</h3>

This project solves HiveOS's monthly fee for more than 4 workers, as it is completely free. Most miners want a central place to view how their workers (systems) are doing, and this project does just that.

<h3>What can this do?</h3>

- Look up miner addresses faster than the pool itself (Ethermine & Flexpool)
- Store multiple miner addresses to view on a single dashboard using LocalStorage (why LocalStorage? All information is public on the blockchain, thus having ETH addresses in LocalStorage and somebody having it does not make a difference, everybody can see how much money you have in a wallet if they have your address, but nobody can steal it.) <i>(WIP)</i>
- Display the prices of the top 100 cryptocurrencies by market cap <i>(WIP)</i>

<h3>What can't this do?</h3>

Adjust your workers' overclocks and change wallets/miners. As of now, it is still needed to adjust such settings on Hive's app or online dashboard, as this project does not yet support utilizing HiveOS's API key to adjust overclocks and change wallets.

<h3>Why'd you make this?</h3>

For me personally, I use HiveOS as my workers' operating system for simplicity sake, however, it costs money to run more than 1 worker on a single account, so now I have multiple accounts which can be a pain especially with 2FA. All I use Hive's online dashboard for is to view the amount of valid shares vs invalid shares, and rarely adjust my overclocks now that they've been dialed in for months, so I decided to create something to check on how all my systems are doing in one place.

<h3>Current Features</h3>
<ul>
<li>Support Ethermine & Flexpool</li>
<li>Support Ethereum miners</li>
<li>Display BTC, ETH, and BNB prices</li>
<li>Faster than actual mining pools</li>
</ul>

<h3>Upcoming Features</h3>
<ul>
<li>Display current gas price on Ethereum Network</li>
<li>Add multiple rigs with different eth addresses</li>
<li>Display top 100 cryptocurrencies by market cap</li>
<li>Allow user to enter HIVEOS API Key to adjust OC/Wallet/Miner within the website</li>
</ul>

<i>At first, only Ethermine and Flexpool will be supported, but as time goes on, more pools will be supported.</i>

**Project Began October 2021**

blazer
======

is a simple snake game like example using the MatchStick (matchstick.tv) Web SDK.
It consists of a sender and a receiver application. The sender app can be run in a webbrowser, while the receiver app needs to be published on a webserver (eg. python -m SimpleHTTPServer) on your local machine. The sender app then tells the fling deamon and thus the MatchStick HomeScreen Application load the receiver app into an iframe of the CastAppContainer app and start those. Both applications can communicate. In this example the sender app can control the snake either using keyboard or the buttons.

 
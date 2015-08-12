#!/bin/bash

export PATH=$PATH:/usr/bin
cd /home/br.org.madeinbrazil.PictureServerNotifier
pm2 start pictureServerNotifier.js


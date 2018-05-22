#!/bin/bash

if [ ! -d platforms/ios ]; then
    exit 0
fi


NAME="$(find platforms/ios/ -name 'CDVLaunchScreen.storyboard')"
sed -i '' 's_secondItem="xb3-aO-Qok" secondAttribute="top"_secondItem="Ze5-6b-2t3" secondAttribute="bottom"_g' "$NAME"

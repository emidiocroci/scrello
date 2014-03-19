#!/bin/bash
for file in $(ls *.js)
do
	js2coffee $file > $(basename $file .js).coffee 
done
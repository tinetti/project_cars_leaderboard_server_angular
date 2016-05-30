#!/bin/bash

curl -X POST -H "Content-Type:application/json" --data '{"driver":"johnny","lapTime":"1:23.456","carName":"BMW M6","carClassName":"Road B","trackLocation":"BIR","trackVariation":"Short"}' http://localhost:3000/api/laps 
echo
sleep 1

curl -X POST -H "Content-Type:application/json" --data '{"driver":"pauly","lapTime":"2:34.567","carName":"M3","carClassName":"Sweet","trackLocation":"BIR","trackVariation":"Long"}' http://localhost:3000/api/laps
echo
sleep 1

curl -X POST -H "Content-Type:application/json" --data '{"driver":"johnny","lapTime":"3:45.678","carName":"M6","carClassName":"Nice","trackLocation":"Bir ","trackVariation":"Short"}' http://localhost:3000/api/laps

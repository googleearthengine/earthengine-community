/**
 * Copyright 2021 The Google Earth Engine Community Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// [START earthengine__apidocs__ee_featurecollection_kriging]
/**
 * This example generates an interpolated surface using kriging from a contrived
 * FeatureCollection of points that simulates a table of air temperature at
 * ocean weather buoys.
 */

// Average air temperature at 2m height for June, 2020.
var img = ee.Image('ECMWF/ERA5/MONTHLY/202006')
              .select(['mean_2m_air_temperature'], ['tmean']);

// Region of interest: South Pacific Ocean.
var roi = ee.Geometry.Polygon(
        [[[-156.053, -16.240],
          [-156.053, -44.968],
          [-118.633, -44.968],
          [-118.633, -16.240]]], null, false);

// Sample the mean June 2020 temperature surface at random points in the ROI.
var tmeanFc = img.sample(
  {region: roi, scale: 25000, numPixels: 250, geometries: true});

// Select a random point to generate a semivariogram for; getting a rough
// estimate of how to set kriging parameters is the goal.
var repPoint = tmeanFc.randomColumn().sort('random').first();

// Construct the semivariogram for the selected point and its neighbors.
var semivariogram = tmeanFc.map(function(feature) {
  var distance = feature.distance(repPoint);
  var variance = feature.getNumber('tmean')
                          .subtract(repPoint.getNumber('tmean')).pow(2);
  return feature.set({distance: distance, variance: variance});
});

// Interpret the semivariogram for the selected point and its neighbors to
// determine kriging shape (gaussian), range (2800 km), sill (164)
// parameter arguments.
print(ui.Chart.feature.byFeature(semivariogram, 'distance', 'variance')
          .setChartType('ScatterChart'));

// Generate an interpolated surface from the points using kriging; set the
// arguments according to interpretation of the plotted semivariogram.
var tmeanImg = tmeanFc.kriging({
  propertyName: 'tmean',
  shape: 'gaussian',
  range: 2.8e6,
  sill: 164,
  nugget: 0.05,
  maxDistance: 2.8e6,
  reducer: ee.Reducer.mean()
})
// Set the coordinate reference system and scale of the image.
.reproject('EPSG:4326', null, 25000);

// Display the results on the map.
Map.setCenter(-137.47, -30.47, 3);
Map.addLayer(tmeanImg, {min: 279, max: 300}, 'Temperature (K)');
// [END earthengine__apidocs__ee_featurecollection_kriging]

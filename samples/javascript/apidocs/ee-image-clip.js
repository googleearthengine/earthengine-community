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

// [START earthengine__apidocs__ee_image_clip]
// A digital elevation model.
var dem = ee.Image('NASA/NASADEM_HGT/001');
var demVis = {bands: 'elevation', min: 0, max: 3000};
print('DEM', dem);
Map.setCenter(-121.38, 46.51, 8);
Map.addLayer(dem, demVis, 'DEM');

// Clip the DEM by a single polygon geometry.
var geom1 = ee.Geometry.BBox(-123.55, 46.61, -122.57, 46.98);
var demClip = dem.clip(geom1);
print('Clipped image retains metadata and band names', demClip);
Map.addLayer(demClip, demVis, 'Single geometry clip');
Map.addLayer(geom1, {color: 'red'}, 'Single geometry');

// Clip the DEM by a multipolygon geometry.
var geom2 = ee.Algorithms.GeometryConstructors.MultiGeometry([
  ee.Geometry.BBox(-122.25, 46.61, -121.27, 47.11),
  ee.Geometry.BBox(-121.86, 45.95, -121.08, 46.39)
]);
Map.addLayer(dem.clip(geom2), demVis, 'Multigeometry clip');
Map.addLayer(geom2, {color: 'blue'}, 'Multigeometry');

// Clip the DEM by a line geometry.
var geom3 = ee.Geometry.LinearRing(
    [[-122.19, 46.31], [-122.37, 46.15], [-122.01, 46.12], [-122.19, 46.31]]);
Map.addLayer(dem.clip(geom3), demVis, 'Line clip');
Map.addLayer(geom3, {color: 'orange'}, 'Line');

// Clip the DEM by a Feature.
var feature = ee.Feature(ee.Geometry.BBox(-120.79, 46.18, -120.16, 46.41));
Map.addLayer(dem.clip(feature), demVis, 'Feature clip');
Map.addLayer(feature, {color: 'yellow'}, 'Feature');
// [END earthengine__apidocs__ee_image_clip]

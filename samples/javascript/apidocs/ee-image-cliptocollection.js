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

// [START earthengine__apidocs__ee_image_cliptocollection]
// A digital elevation model.
var dem = ee.Image('NASA/NASADEM_HGT/001');
var demVis = {bands: 'elevation', min: 0, max: 2000};
print('DEM', dem);
Map.setCenter(-121.38, 46.51, 8);
Map.addLayer(dem, demVis, 'DEM');

// A FeatureCollection.
var fc = ee.FeatureCollection([
  ee.Feature(ee.Geometry.BBox(-120.79, 46.18, -120.16, 46.41)),
  ee.Feature(ee.Geometry.BBox(-120.79, 46.58, -120.16, 46.81)),
  ee.Feature(ee.Geometry.BBox(-122.25, 46.61, -121.27, 47.11)),
]);

// Clip the DEM by a FeatureCollection.
var demClip = dem.clipToCollection(fc);
print('Clipped image retains metadata and band names', demClip);
Map.addLayer(demClip, demVis, 'FeatureCollection clip');
Map.addLayer(fc, {color: 'blue'}, 'FeatureCollection');
// [END earthengine__apidocs__ee_image_cliptocollection]

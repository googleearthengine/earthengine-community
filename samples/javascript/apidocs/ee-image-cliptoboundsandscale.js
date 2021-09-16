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

// [START earthengine__apidocs__ee_image_cliptoboundsandscale]
// A digital elevation model.
var dem = ee.Image('NASA/NASADEM_HGT/001');
var demVis = {bands: 'elevation', min: 0, max: 2000};
print('DEM', dem);
Map.setCenter(-121.38, 46.51, 8);
Map.addLayer(dem, demVis, 'DEM');

// Clip DEM by a single polygon geometry, specify width and height parameters.
var geom1 = ee.Geometry.BBox(-123.55, 46.61, -122.57, 46.98);
var demClip1 = dem.clipToBoundsAndScale({
  geometry: geom1,
  width: 20,  // pixels
  height: 10  // pixels
});
print('Clipped image retains metadata and band names', demClip1);
Map.addLayer(demClip1, demVis, 'Single geometry clip (width, height)');
Map.addLayer(geom1, {color: 'red'}, 'Single geometry (width, height)');

// Clip DEM by a multipolygon geometry, specify width and height parameters.
var geom2 = ee.Algorithms.GeometryConstructors.MultiGeometry([
  ee.Geometry.BBox(-122.25, 46.61, -121.27, 47.11),
  ee.Geometry.BBox(-121.86, 45.95, -121.08, 46.39)
]);
var demClip2 = dem.clipToBoundsAndScale({
  geometry: geom2,
  width: 20,  // pixels
  height: 10  // pixels
});
Map.addLayer(demClip2, demVis, 'Multigeometry clip (width, height)');
Map.addLayer(geom2, {color: 'blue'}, 'Multigeometry');

// Clip DEM by a line geometry, specify width and height parameters.
var geom3 = ee.Geometry.LinearRing(
    [[-123.19, 46.51], [-123.37, 46.35], [-123.01, 46.32], [-123.19, 46.51]]);
var demClip3 = dem.clipToBoundsAndScale({
  geometry: geom3,
  width: 10,  // pixels
  height: 5  // pixels
});
Map.addLayer(demClip3, demVis, 'Line clip (width, height)');
Map.addLayer(geom3, {color: 'orange'}, 'Line (width, height)');

// Clip DEM by a single polygon geometry, specify maxDimension parameter.
var geom4 = ee.Geometry.BBox(-120.79, 46.58, -120.16, 46.81);
var demClip4 = dem.clipToBoundsAndScale({
  geometry: geom4,
  maxDimension: 5,  // pixels
});
Map.addLayer(demClip4, demVis, 'Single polygon clip (maxDimension)');
Map.addLayer(geom4, {color: 'yellow'}, 'Single polygon (maxDimension)');

// Clip DEM by a single polygon geometry, specify scale parameter.
var geom5 = ee.Geometry.BBox(-120.79, 46.18, -120.16, 46.41);
var demClip5 = dem.clipToBoundsAndScale({
  geometry: geom5,
  scale: 1e4,  // meters
});
Map.addLayer(demClip5, demVis, 'Single polygon clip (scale)');
Map.addLayer(geom5, {color: 'purple'}, 'Single polygon (scale)');
// [END earthengine__apidocs__ee_image_cliptoboundsandscale]

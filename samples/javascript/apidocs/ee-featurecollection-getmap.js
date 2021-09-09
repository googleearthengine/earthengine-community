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

// [START earthengine__apidocs__ee_featurecollection_getmap]
// FeatureCollection of power plants in Belgium.
var fc = ee.FeatureCollection('WRI/GPPD/power_plants')
            .filter('country_lg == "Belgium"');

// Get MapId for styled FeatureCollection.
var mapId = fc.getMap({color: '800080'});
print('mapId for styled FeatureCollection', mapId);

// MapId can be used as an input to Map.addLayer to display the layer.
Map.centerObject(fc, 7);
Map.addLayer(mapId);

// MapId can be used as an input to ee.data.getTileUrl to fetch map tiles.
print('URL for zoom level 6 tile that includes majority of points',
      ee.data.getTileUrl({id: mapId, x: 32, y: 21, z: 6}));
// [END earthengine__apidocs__ee_featurecollection_getmap]

# CVACEdit

This is mobile app which helps public works people to manage the status of the fields located at Chesterfield Valley Athletic center.
This app is build on hybrid ionic platform. Due to hybrid platform, it also works on any andriod device.

The first tab loads the gis/map view of the CVAC fields where color red means closed and green means open. iframe is used to load the gis view from http://mapping.chesterfield.mo.us/apps/CVACviewer/ which is build on ESRI's ARCgis platform.

![cvac1](https://cloud.githubusercontent.com/assets/5523584/17107506/22084e52-5255-11e6-94a0-f05ee92b1a29.png)

The second tab shows the status of the fields in list view (ion-item). It uses ion-option-button to support swipe left to toggle the status of the field (open to close or vice versa).

![cvac2](https://cloud.githubusercontent.com/assets/5523584/17107505/2200892e-5255-11e6-96f3-e3d51a83ceb2.png)

The third tab shows the status of the fields in native toggle view. It uses ion-toggle to get that native look & toggle the status.

![cvac3](https://cloud.githubusercontent.com/assets/5523584/17107507/22080686-5255-11e6-9fb4-7efcb0d35fca.png)

The screenshots are taken on iPad using ionic view app.

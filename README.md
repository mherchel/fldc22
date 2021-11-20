
## How to update the site for a new year

1. Update the site slogan at `/admin/config/system/site-information`. This will affect the meta tags.
2. Update the Camp Details at `/admin/camp-details`
3. Browse through all of the content and update the basic pages as needed.
4. Unpublish (don't delete) all of the sponsors.
5. Delete all of the sessions and trainings as necessary


## How to update the Schedule View for another year

1. Edit the menu item attributes for the menu items in the "Schedule Tabs" menu at `/admin/structure/menu/manage/schedule-tabs`. To do this you'll see the "Attribute" Details element when editing the menu items. You'll need to add a machine readable date there (eg `2022-02-18`). This will affect the text to the right within the tabs.
2. Edit all the taxonomy term fields within the "Session Time Slot" vocabulary at `/admin/structure/taxonomy/manage/time_slot/overview`
3. Edit the Views Filters in the "Session Schedule" view at `/admin/structure/views/view/session_schedule`. You'll see a min value and max value. You'll need to update them both to reflect the new date.
4. Repeat the last step on each of the page displays within the "Session Schedule" view.
5. Review and edit all transactional emails at `admin/structure/workbench-moderation/workbench-email-template`
6. Update config with the transactional email changes.

// Stores the help text for each page

export default {
  "Home Template":
  `
  <p>
  The Home Page Template is where you enter the primary data about your course, including Title, Url, Description, and information about the instructors and meeting times.
  Please double check that your Course URL (the third input on the <strong> COURSE INFO </strong> tab) is correct as this is used to generate the links to each page.
  </p>
  <p>
  You can also adjust the image or video embeded on the home page to the left of the description by selecting the <strong> "MEDIA INPUT" </strong> tab as well as the banner for your school (if you did not select on the starting form).
  Use the BUTTONS tab to turn the Syllabus and Activities button on or off depending on whether you use these pages in your course.
  </p>

  <p>
  If your title is too long for the requisite image, try checking the "USE WIDE BANNER" option under the "BANNER" tab if it is available for your school. Otherwise it is reccomended to use a shorter title.
  </p>
  `,
  "Syllabus Template":
  `
  <p>The Syllabus Template is where you enter the primary information about the instructors and determine which syllabus sections you would like to include in your class. </p>
  <p>Use the "ADD PROFESSOR" and "ADD TA" buttons at the top of the page to add new instructors. You can edit or remove an instructor by selecting their name from the dropdown menu next to
  "EDIT INFO" and clicking "EDIT" if there are no forms visible.</p>
  <p>
  You can also quickly edit the title and date of each of your sessions using the "EDIT SCHEDULE ITEMS" section. If you would like to add or remove sections from the syllabus check the boxes under
  "SECTIONS/OPTIONS". You may also turn dates off if you would not like it to be visible in the Weekly Schedule section.
  </p>
  <p> Once you are completed you should edit the text on the page for each syllabus section directly in canvas. </p>
  `,
  "Program Overview":
  `
  <p>The Program Overview Template lets you create a page that shows an overview of the sessions in your executive training course at a glance. This page is best completed before the "WEEKLY LIST" Page
  as it will automatically set the correct dates based on your selected settings. </p>
  <p>First, complete the first box, starting with "HOW MANY WEEKS" and proceeding down in the order of the dialogs. Use the "OFFSET CLASS START" option if your course starts on a day other than your usual session time.
  Once you have completed all of the sessions it is reccomended to click the "EDIT # OF SESSIONS" button which will trim the sessions displayed in the "WEEKLY ACTIVITES" page based on the date information you provided.
  If you see any errors in display or dates it is reccomended to open and close the "DAYS OF WEEK" dropdown as this will let the program recalculate the display.</p>
  <p> There are additional input sections to quickly change the title and date of each session manually and to modify whether there are two meetings times per day.
  `,
  "Weekly Activities List":
  `
  <p>The Weekly Activities List shows all of the sessions in your course and links to their individual pages. At the top of the page
  you can select the number of lectures or sessions in your course and click te "EDIT # OF ACTIVITES" button to trim the amount of sessions shown.
  If you are in a weekly course, you can also select a "START DATE" which will automatically modify each session's date so that the they appear a week after one another.
  If your dates are more complex, you can set them manually for each session individually or click the "DATES" toggle at the bottom of the page to remove them altogether.</p>
  <p>The main box shows lets you edit the information for each individual session, including Title, Description, Date, and Preview Image. You can submit an image
  from an online URL (e.g. found from google images) or from a file directly from your computer. If you would like to use the default image you can press the "RESET IMAGE" button
  or turn off images altogether using the "IMAGES" toggle at the bottom of the page.</p>
  <p>If you do not want to have individual pages for each class session, then click the "LINKS" toggle to remove the hotlinks on the session images and titles.</p>
  `,
  "Weekly Activity":
  `
  <p>On the Individual Activity page you can edit the information for each session. First you can select which session you would like to change using the dropdown
  at the top of the page. Next you can edit the title using the input directly below or the decription, by clicking the "SHOW TEXT EDITOR" button if no input is visible.
  The readings and lecture presentation sections should be edited directly in the Canvas rich text editor for each page.</p>

  <p>You may also add videos, discussins, or assignments by clicking the respective buttons, selecting "EDIT" and modifying the inputs shown.</p>
  `,
  default:
  `
  `,

}

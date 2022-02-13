# Usage

1. Clone this repository ⬇️, 
1. open a terminal inside ``html_to_pdf/`` and run ``npm install`` 💻,
1. place your ``index.html`` file and others in a folder ``NAMEME/`` ⤵,
1. place ``NAMEME/`` in one of the folders inside ``data/`` 📁,
1. reuse the previous terminal inside ``html_to_pdf/`` and run a server 🖥️,
    * I use ``http-server``, which you can install and run using ``npm install http-server`` and ``http-server``, respectively.
1. open a new terminal inside ``html_to_pdf/`` and run ``node index.js`` 🏃, and
1. check out your PDFs inside ``pdfs/``! 😄

# Tips

1. If your PDFs don't look correct, use ``<style>...</style>`` tags inside your ``index.html`` file instead of external ``.css`` files for styling.
1. Add ``html { -webkit-print-color-adjust: exact; }`` inside your ``<style>...</style>`` tags for better colors! 🌈

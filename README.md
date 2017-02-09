Olapic - PublicDocs
==========

Repository for [developer.olapic.com](http://developer.olapic.com)

## Working Locally

1. Make sure you have the required components installed first. 

  Visit [https://help.github.com/articles/setting-up-your-github-pages-site-locally-with-jekyll/#requirements](https://help.github.com/articles/setting-up-your-github-pages-site-locally-with-jekyll/#requirements) for details. 
  
  Few side notes:

  - [RVM](https://rvm.io/rvm/install) is highly recommended.
  - Having issues with `bundle` command getting stuck on installing `nokogiri` on El Capitan? Check out: [http://stackoverflow.com/a/34653921](http://stackoverflow.com/a/34653921).

2. In terminal:

    ```sh
    $ jekyll serve
    ```

3. Terminal should read something like:

    ```sh
    Configuration file: /Users/jae/OLAPIC/PublicDocs/_config.yml
    Configuration file: /Users/jae/OLAPIC/PublicDocs/_config.yml
                Source: /Users/jae/OLAPIC/PublicDocs
           Destination: /Users/jae/OLAPIC/PublicDocs/_site
     Incremental build: disabled. Enable with --incremental
          Generating...
                        done in 0.456 seconds.
     Auto-regeneration: enabled for '/Users/jae/OLAPIC/PublicDocs'
    Configuration file: /Users/jae/OLAPIC/PublicDocs/_config.yml
        Server address: http://127.0.0.1:4000/
      Server running... press ctrl-c to stop.
    ```

4. The static site will be available at [http://127.0.0.1:4000/](http://127.0.0.1:4000/)

5. Start writing articles!

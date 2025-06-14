#!C:/Strawberry/perl/bin/perl.exe
use strict;
use warnings;
use CGI;
use JSON;
use MIME::Base64;
use File::Slurp;
use CGI::Carp qw(fatalsToBrowser);  # Show Perl errors in browser

my $q = CGI->new;

# Print HTTP header first
print $q->header('application/json');

# Get the user ID from POST
my $user = $q->param('user') || '';

# Build the path
my $dir = "C:/xampp/cgi-bin/user_uploads/$user";  # FULL PATH

# Return empty JSON if directory doesn't exist
unless (-d $dir) {
    print encode_json([]);
    exit;
}

# Read image files
opendir(my $dh, $dir) or die "Can't open directory $dir: $!";
my @images = grep { /\.(jpg|jpeg|png|gif)$/i } readdir($dh);
closedir($dh);

my @results;

foreach my $img (@images) {
    my $filepath = "$dir/$img";

    next unless -e $filepath;

    my $data = read_file($filepath, binmode => ':raw');
    my $mime = $img =~ /\.png$/i ? 'image/png' :
               $img =~ /\.gif$/i ? 'image/gif' : 'image/jpeg';

    push @results, {
        filename => $img,
        base64 => "data:$mime;base64," . encode_base64($data, '')
    };
}

print encode_json(\@results);

# #!C:/Strawberry/perl/bin/perl.exe
# use strict;
# use warnings;
# use CGI;
# use JSON;
# use MIME::Base64;
# use File::Slurp;

# my $q = CGI->new;
# print $q->header('application/json');

# my $user = $q->param('user') || '';
# my $dir = "user_uploads/$user";

# unless (-d $dir) {
#     print encode_json([]);
#     exit;
# }

# opendir(my $dh, $dir) or die "Can't open $dir: $!";
# my @images = grep { /\.(jpg|jpeg|png|gif)$/i } readdir($dh);
# closedir($dh);

# my @base64_images;

# foreach my $img (@images) {
#     my $path = "$dir/$img";
#     next unless -f $path;
#     my $data = read_file($path, binmode => ':raw');

#     my $mime = $img =~ /\.png$/i ? 'image/png' :
#                $img =~ /\.gif$/i ? 'image/gif' : 'image/jpeg';

#     my $base64 = encode_base64($data, '');
#     push @base64_images, "data:$mime;base64,$base64";
# }

# print encode_json(\@base64_images);